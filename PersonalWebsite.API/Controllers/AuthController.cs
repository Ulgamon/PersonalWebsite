﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PersonalWebsite.API.Data;
using PersonalWebsite.API.Models.BlogPosts;
using PersonalWebsite.API.Models.Users;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PersonalWebsite.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly PersonalWebsiteDevelopmentDbContext _context;
        private readonly ILogger<AuthController> _logger;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public AuthController(UserManager<ApplicationUser> userManager, PersonalWebsiteDevelopmentDbContext context, ILogger<AuthController> logger, IMapper mapper, IConfiguration configuration)
        {
            _userManager = userManager;
            _context = context;
            _logger = logger;
            _mapper = mapper;
            _configuration = configuration;

        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(CreateApplicationUserDto userDto)
        {
            _logger.LogInformation($"Registration attempt for {userDto.Email}");
            try
            {
                ApplicationUser user = _mapper.Map<ApplicationUser>(userDto);
                user.UserName = userDto.Email;
                IdentityResult result = await _userManager.CreateAsync(user, userDto.Password);

                if (!result.Succeeded)
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);
                        return BadRequest(ModelState);
                    }
                }
                await _userManager.AddToRoleAsync(user, "User");

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something went wrong in the {nameof(Register)}");
                return Problem($"Something went wrong in the {nameof(Register)}", statusCode: 500);
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<AuthResponse>> Login(LoginApplicationUserDto applicationUser)
        {
            _logger.LogInformation($"Login attempt for {applicationUser.Email}");
            try
            {
                ApplicationUser? user = await _userManager.FindByEmailAsync(applicationUser.Email);
                if (user == null)
                {
                    return Unauthorized();
                }
                bool passwordValid = await _userManager.CheckPasswordAsync(user, applicationUser.Password);

                if (passwordValid == false || !user.EmailConfirmed)
                {
                    return Unauthorized();
                }

                string tokenString = await GenerateToken(user);

                var response = new AuthResponse
                {
                    Email = applicationUser.Email,
                    Token = tokenString,
                    UserId = user.Id
                };

                return Ok(response);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something went wrong in the {nameof(Register)}");
                return Problem($"Something went wrong in the {nameof(Register)}", statusCode: 500);
            }
        }

        [Authorize]
        [HttpGet]
        [Route("BlogPosts")]
        public async Task<ActionResult<PaginateBlogPostsDto>> GetAuthBlogPosts(int size = 3, int page = 1)
        {
            if (size < 1 || page < 1)
                return BadRequest("Invalid size and/or page params should be size >= 1 and page >= 1.");
            try
            {
                bool hasNext = true;
                bool hasPrev = page > 1;
                // and the AutoMapper should map ApplicationUser to BlogPostUser
                // so I don't have any data memory leaks
                // BLOG POSTS ARE RETURNED IN A CREATED DATE DESCENDING ORDER

                int blogsCount = await _context.BlogPosts.CountAsync();

                // it is size * page because I need to check one page in advance
                if (size * page >= blogsCount)
                {
                    hasNext = false;
                }

                // # To do
                int howManyToSkip = size * (page - 1);

                if (howManyToSkip >= blogsCount)
                    return BadRequest("Out of range page and/or size parameters.");

                // Add pagination with .Skip() and .Take()
                List<BlogPost> rawBlogPosts = await _context.BlogPosts
                    .OrderByDescending(e => e.CreatedDate)
                    .Skip(howManyToSkip)
                    .Take(size)
                    .ToListAsync();

                List<ReturnBlogPostsDto> blogPosts = _mapper.Map<List<ReturnBlogPostsDto>>(rawBlogPosts);

                PaginateBlogPostsDto result = new PaginateBlogPostsDto
                {
                    BlogPostsDtos = blogPosts,
                    HasPrev = hasPrev,
                    HasNext = hasNext,
                    CurrentPage = page,
                    NumberOfElements = blogsCount
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Blog Posts GET: {ex.Message}");
                return StatusCode(500);
            }
        }

        // GET: api/BlogPosts/5
        [Authorize]
        [HttpGet("BlogPosts/{id}")]
        public async Task<ActionResult<ReturnBlogPostDto>> GetAuthBlogPost(int id)
        {
            try
            {
                var blogPost = await _context.BlogPosts
                    // Automapper used for mapping Category Model to ReturnCategoryDto Model
                    .Include(e => e.Categories)
                    .SingleAsync(e => e.Id == id);

                ReturnBlogPostDto blogPostDto = _mapper.Map<ReturnBlogPostDto>(blogPost);

                return Ok(blogPostDto);
            }
            catch (Exception ex)
            {
                if (ex.GetBaseException() is InvalidOperationException)
                {
                    return NotFound();
                }
                _logger.LogError(ex, $"Error in HTTP GET Method BlogPost: {ex.Message}");
                return StatusCode(500);
            }

        }

        private async Task<string> GenerateToken(ApplicationUser user)
        {
            SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var roles = await _userManager.GetRolesAsync(user);
            var roleClaims = roles.Select(q => new Claim(ClaimTypes.Role, q)).ToList();

            var userClaims = await _userManager.GetClaimsAsync(user);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.Id)
            }
            .Union(userClaims)
            .Union(roleClaims);

            var token = new JwtSecurityToken(
               issuer: _configuration["JwtSettings:Issuer"],
               audience: _configuration["JwtSettings:Audience"],
               claims: claims,
               expires: DateTime.UtcNow.AddHours(Convert.ToInt32(_configuration["JwtSettings:Duration"])),
               signingCredentials: credentials
           );

            return new JwtSecurityTokenHandler().WriteToken(token);
        } 
    }
}
