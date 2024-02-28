using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PersonalWebsite.API.Data;
using PersonalWebsite.API.Models.BlogPosts;

namespace PersonalWebsite.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly PersonalWebsiteDevelopmentDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<SearchController> _logger;


        public SearchController(PersonalWebsiteDevelopmentDbContext context, IMapper mapper, ILogger<SearchController> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        //[HttpGet]
        //public async Task<ActionResult<PaginateBlogPostsDto>> SearchBlogPosts(string q, [FromQuery] int[] categoryids)
        //{
        //    return Ok();
        //}
    }
}
