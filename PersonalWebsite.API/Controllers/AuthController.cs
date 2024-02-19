using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;
using PersonalWebsite.API.Data;
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
        private readonly ILogger<AuthController> _logger;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public AuthController(UserManager<ApplicationUser> userManager, ILogger<AuthController> logger, IMapper mapper, IConfiguration configuration)
        {
            _userManager = userManager;
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

                return Accepted();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something went wrong in the {nameof(Register)}");
                return Problem($"Something went wrong in the {nameof(Register)}", statusCode: 500);
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginApplicationUserDto applicationUser)
        {
            _logger.LogInformation($"Login attempt for {applicationUser.Email}");
            try
            {
                ApplicationUser? user = await _userManager.FindByEmailAsync(applicationUser.Email);
                bool passwordValid = await _userManager.CheckPasswordAsync(user, applicationUser.Password);

                if (user == null || passwordValid == false || !user.EmailConfirmed)
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

                return Accepted(response);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something went wrong in the {nameof(Register)}");
                return Problem($"Something went wrong in the {nameof(Register)}", statusCode: 500);
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
            }.Union(userClaims)
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
