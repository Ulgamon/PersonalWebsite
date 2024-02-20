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
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments(int id, int size = 5, int page = 1)
        {


            return BadRequest();
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
