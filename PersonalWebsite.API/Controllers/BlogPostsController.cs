using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PersonalWebsite.API.Data;
using PersonalWebsite.API.Models.BlogPosts;

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
        public async Task<ActionResult<IEnumerable<ReturnBlogPostDto>>> GetBlogPosts()
        {
            try
            {
                // rawBlogPosts uses LINQ to retrieve User Data about the post
                // and the AutoMapper should map ApplicationUser to BlogPostUser
                // so I don't have any data memory leaks
                var rawBlogPosts = await _context.BlogPosts.Include(e => e.User).ToListAsync();
                var blogPosts = _mapper.Map<ReturnBlogPostDto>(rawBlogPosts);

                return Ok(blogPosts);
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
                var blogPost = await _context.BlogPosts.FindAsync(id);

                if (blogPost == null)
                {
                    return NotFound();
                }

                var blogPostDto = _mapper.Map<ReturnBlogPostDto>(blogPost);

                return Ok(blogPostDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in HTTP GET Method BlogPost: {ex.Message}");
                return StatusCode(500);
            }
           
        }

        // PUT: api/BlogPosts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBlogPost(int id, UpdateBlogPostDto blogPostDto)
        {
            BlogPost blogPost = _mapper.Map<BlogPost>(blogPostDto);

            if (id != blogPost.Id)
            {
                return BadRequest();
            }

            _context.Entry(blogPost).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await BlogPostExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BlogPosts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ReturnBlogPostDto>> PostBlogPost(CreateBlogPostDto blogPostDto)
        {
            BlogPost blogPost = _mapper.Map<BlogPost>(blogPostDto);

            _context.BlogPosts.Add(blogPost);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (await BlogPostExists(blogPost.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction(nameof(GetBlogPost), new { id = blogPost.Id }, blogPost);
        }

        // DELETE: api/BlogPosts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlogPost(int id)
        {
            var blogPost = await _context.BlogPosts.FindAsync(id);
            if (blogPost == null)
            {
                return NotFound();
            }

            _context.BlogPosts.Remove(blogPost);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task<bool> BlogPostExists(int id)
        {
            return await _context.BlogPosts.AnyAsync(e => e.Id == id);
        }
    }
}
