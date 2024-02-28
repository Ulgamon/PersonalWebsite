using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PersonalWebsite.API.Data;
using PersonalWebsite.API.Models.BlogPosts;
using PersonalWebsite.API.Models.Categories;

namespace PersonalWebsite.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostsController : ControllerBase
    {
        private readonly PersonalWebsiteDevelopmentDbContext _context;
        private readonly ILogger<BlogPostsController> _logger;
        private readonly IMapper _mapper;

        public BlogPostsController(PersonalWebsiteDevelopmentDbContext context, ILogger<BlogPostsController> logger, IMapper mapper)
        {
            _context = context;
            _logger = logger;
            _mapper = mapper;
        }

        // GET: api/BlogPosts
        [HttpGet]
        public async Task<ActionResult<PaginateBlogPostsDto>> GetBlogPosts(int size = 3, int page = 1)
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

                int blogsCount = await _context.BlogPosts.Where(e => e.Published == true).CountAsync();

                // it is size * page because I need to check one page in advance
                if (size * page > blogsCount)
                {
                    hasNext = false;
                }

                // # To do
                int howManyToSkip = size * (page - 1);

                if (howManyToSkip >= blogsCount)
                    return BadRequest("Out of range page and/or size parameters.");

                // Add pagination with .Skip() and .Take()
                List<BlogPost> rawBlogPosts = await _context.BlogPosts
                    .Where(e => e.Published == true)
                    .OrderByDescending(e => e.PublishedDate)
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
        [HttpGet("{id}")]
        public async Task<ActionResult<ReturnBlogPostDto>> GetBlogPost(int id)
        {
            try
            {
                if (!await BlogPostExists(id))
                {
                    return NotFound();
                }
                var blogPost = await _context.BlogPosts
                    // Automapper used for mapping Category Model to ReturnCategoryDto Model
                    .Include(e => e.Categories)
                    .SingleAsync(e => e.Id == id && e.Published == true);

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

        // PUT: api/BlogPosts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> PutBlogPost(int id, UpdateBlogPostDto blogPostDto)
        {
            try
            {
                if (id != blogPostDto.Id)
                {
                    return BadRequest();
                }
                blogPostDto.Trim();

                BlogPost? blogPost = await _context.BlogPosts.FindAsync(id);

                if (blogPost != null)
                {
                    blogPost.BlogMdText = blogPostDto.BlogMdText;
                    blogPost.ImgUrl = blogPostDto.ImgUrl;
                    blogPost.Title = blogPostDto.Title;
                    blogPost.UpdatedDate = DateTime.Now;
                    blogPost.Published = blogPostDto.Published;

                    if (blogPostDto.Published == true)
                    {
                        blogPost.PublishedDate = DateTime.Now;
                    }

                    await _context.SaveChangesAsync();

                    return NoContent();
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Cannot UPDATE Blog Post: {ex.Message}");
                return StatusCode(500, ex.Message);
            }
        }

        // POST: api/BlogPosts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<int>> PostBlogPost(CreateBlogPostDto blogPostDto)
        {
            string? userEmail = User.FindFirstValue(ClaimTypes.Email);
            if (userEmail == null)
            {
                return Unauthorized();
            }
            var user = await _context.Users
                .Where(e => e.Email == userEmail)
                .FirstOrDefaultAsync();
            if (user == null)
            {
                return Unauthorized();
            }
            blogPostDto.Trim();
            BlogPost blogPost = _mapper.Map<BlogPost>(blogPostDto);

            blogPost.UserId = user.Id;

            await _context.BlogPosts.AddAsync(blogPost);

            try
            {
                await _context.SaveChangesAsync();
                return Ok(blogPost.Id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Cannot POST Blog Post: {ex.Message}");
                if (ex.GetBaseException() is DbUpdateException)
                {
                    return BadRequest(ex.Message);
                }
                return StatusCode(500, ex.Message);
            }            

        }

        // DELETE: api/BlogPosts/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteBlogPost(int id)
        {
            var blogPost = await _context.BlogPosts.FindAsync(id);
            if (blogPost == null)
            {
                return NotFound();
            }
            try
            {
                _context.BlogPosts.Remove(blogPost);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, $"Cannot POST Blog Post: {ex.Message}");
                return StatusCode(500, ex.Message);
            }
        }

        private async Task<bool> BlogPostExists(int id)
        {
            return await _context.BlogPosts.AnyAsync(e => e.Id == id);
        }
    }
}
