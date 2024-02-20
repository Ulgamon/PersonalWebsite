using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PersonalWebsite.API.Data;
using PersonalWebsite.API.Models.Comments;

namespace PersonalWebsite.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly PersonalWebsiteDevelopmentDbContext _context;
        private readonly ILogger<CommentsController> _logger;
        private readonly IMapper _mapper;

        public CommentsController(PersonalWebsiteDevelopmentDbContext context, ILogger<CommentsController> logger, IMapper mapper)
        {
            _context = context;
            _logger = logger;
            _mapper = mapper;
        }

        // With Query Param for BlogPost ID
        // GET: api/Comments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReturnCommentsDto>> GetComments(int id, int size = 5, int page = 1)
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
                if (size * page > blogsCount)
                {
                    hasNext = false;
                }

                // # To do
                int howManyToSkip = size * (page - 1);

                if (howManyToSkip >= blogsCount)
                    return BadRequest("Out of range page and/or size parameters.");

                

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Blog Posts GET: {ex.Message}");
                return StatusCode(500);
            }
        }

        // PUT: api/Comments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComment(int id, UpdateCommentDto commentDto)
        {
            return BadRequest();
        }

        // POST: api/Comments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> PostComment(CreateCommentDto commentDto)
        {
            return BadRequest();
        }

        // DELETE: api/Comments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            
            return BadRequest();
        }

        private async Task<bool> CommentExists(int id)
        {
            return await _context.Comments.AnyAsync(e => e.Id == id);
        }
    }
}
