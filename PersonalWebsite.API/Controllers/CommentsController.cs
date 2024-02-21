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
        public async Task<ActionResult<PaginateCommentsDto>> GetComments(int id, int size = 5, int page = 1)
        {
            if (size < 1 || page < 1)
                return BadRequest("Invalid size and/or page params should be size >= 1 and page >= 1.");
            try
            {
                bool hasNext = true;
                bool hasPrev = page > 1;



                int commentsCount = await _context.Comments
                    .Where(e => e.BlogPostId == id)
                    .CountAsync();

                // it is size * page because I need to check one page in advance
                if (size * page > commentsCount)
                {
                    hasNext = false;
                }

                // # To do
                int howManyToSkip = size * (page - 1);

                if (howManyToSkip >= commentsCount)
                    return BadRequest("Out of range page and/or size parameters.");

                

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Comments GET: {ex.Message}");
                return StatusCode(500);
            }
        }

        // PUT: api/Comments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComment(int id, UpdateCommentDto commentDto)
        {
            if (id != commentDto.Id)
            {
                return BadRequest("Id parameters aren't mathing.");
            }
            commentDto.Trim();


            try
            {
                Comment? comment = await _context.Comments.FindAsync(id);
                if (comment == null)
                {
                    return BadRequest("Comment that you are trying to change doesn't exist.");
                }
                comment.Comment1 = commentDto.Comment1;
                comment.Name = commentDto.Name;

                await _context.SaveChangesAsync();

                return Ok("Comment successfully changed.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Comment PUT: {ex.Message}");
                if (ex.GetBaseException() is DbUpdateException)
                {
                    return BadRequest("Check if you entered correct values.");
                }
                return StatusCode(500);
            }
        }

        // POST: api/Comments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> PostComment(CreateCommentDto commentDto)
        {
            commentDto.Trim();
            Comment comment = _mapper.Map<Comment>(commentDto);
            if (commentDto.CommentId != null && commentDto.BlogPostId != null)
            {
                return BadRequest("Invalid CommentId and/or BlogPostId.");
            }
            try
            {
                if (
                    (await _context.BlogPosts
                        .AnyAsync(e => e.Id == commentDto.BlogPostId))
                    ||
                    (await _context.Comments
                        .AnyAsync(e => e.Id == commentDto.CommentId))
                )
                {
                    await _context.Comments.AddAsync(comment);
                    await _context.SaveChangesAsync();

                    return Ok("Comment is posted.");
                }

                return BadRequest("Invalid CommentId and/or BlogPostId.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Comments POST: {ex.Message}");
                if (ex.GetBaseException() is DbUpdateException)
                {
                    return BadRequest("Check if you entered correct values.");
                }
                return StatusCode(500);
            }

        }

        // DELETE: api/Comments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            Comment? comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return BadRequest("Non existing comment.");
            }
            try
            {
                _context.Comments.Remove(comment);
                await _context.SaveChangesAsync();
                return Ok($"Comment with id:{id} deleted successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Comments DELETE: {ex.Message}");
                return StatusCode(500);
            }
        }

    }
}
