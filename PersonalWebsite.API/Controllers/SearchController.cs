using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PersonalWebsite.API.Data;
using PersonalWebsite.API.Models.BlogPosts;
using PersonalWebsite.API.Models.Searches;

namespace PersonalWebsite.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly PersonalWebsiteDevelopmentDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<SearchController> _logger;


        public SearchController(PersonalWebsiteDevelopmentDbContext context, ILogger<SearchController> logger, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        public static bool Compare(string main, string substring)
        {
            StringComparison comp = StringComparison.OrdinalIgnoreCase;
            return main.IndexOf(substring, comp) >= 0;
        }

        [HttpPost]
        public async Task<ActionResult<PaginateBlogPostsDto>> SearchBlogPosts(GetSearchDto searchDto)
        {
            const int size = 10;
            const int page = 1;
            try
            {
                bool hasNext = true;
                bool hasPrev = page > 1;

                List<BlogPost> blogs;

                if (searchDto.Search != null)
                {
                    StringComparison comp = StringComparison.OrdinalIgnoreCase;
                    string search = searchDto.Search;
                    blogs = await _context.BlogPosts
                        .Include(e => e.Categories)
                        .OrderByDescending(b => b.PublishedDate)
                        .ToListAsync();



                    blogs = blogs.Where(e => e.Published && Compare(e.Title, search) ||
                            Compare(e.BlogMdText, search)).ToList();
                        
                } else
                {
                    blogs = await _context.BlogPosts
                        .Include(e => e.Categories)
                        .Where(e => e.Published == true)
                        .OrderByDescending(b => b.PublishedDate)
                        .ToListAsync();
                }
                // n^2 algorithm for searching for categories
                for (int i = 0; i < searchDto.Categories.Count; i++)
                {
                    int id = searchDto.Categories.ElementAt(i).Id;
                    blogs = blogs
                        .Where(e => e.Categories
                            .Where(e => e.Id == id)
                            .FirstOrDefault() != null)
                        .ToList();  
                }
                int blogsCount = blogs.Count;

                // it is size * page because I need to check one page in advance
                if (size * page >= blogsCount)
                {
                    hasNext = false;
                }

                int howManyToSkip = size * (page - 1);

                if (howManyToSkip >= blogsCount)
                    return Ok(new PaginateBlogPostsDto
                    {
                        BlogPostsDtos = new List<ReturnBlogPostsDto>(),
                        CurrentPage = 1,
                        HasNext = hasNext,
                        HasPrev = hasPrev,
                        NumberOfElements = blogsCount,
                    });
                if (blogs.Count >= 10)
                {
                    blogs = blogs.GetRange(0, size);
                }

                PaginateBlogPostsDto result = new PaginateBlogPostsDto
                {
                    BlogPostsDtos = _mapper.Map<ICollection<ReturnBlogPostsDto>>(blogs),
                    CurrentPage = 1,
                    HasNext = hasNext,
                    HasPrev = hasPrev,
                    NumberOfElements = blogsCount,
                };
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Blog Posts GET: {ex.Message}");
                return StatusCode(500);
            }
        }

    }
}
