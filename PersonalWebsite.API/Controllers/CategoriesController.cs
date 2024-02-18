using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PersonalWebsite.API.Data;
using PersonalWebsite.API.Models.Categories;

namespace PersonalWebsite.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly PersonalWebsiteDevelopmentDbContext _context;
        private readonly ILogger<CategoriesController> _logger;
        private readonly IMapper _mapper;

        public CategoriesController(PersonalWebsiteDevelopmentDbContext context, ILogger<CategoriesController> logger, IMapper mapper)
        {
            _context = context;
            _logger = logger;
            _mapper = mapper;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IList<ReturnCategoriesDto>>> GetCategories(int size = 5, int page = 1)
        {   
            // Will be used only for fetching couple of categories on page with number of blog posts that it has
            if (size < 1 || page < 1)
            {
                return BadRequest();
            }

            try
            {
                bool hasNext = true;
                bool hasPrev = page > 1;

                int categoriesCount = await _context.BlogPosts.CountAsync();

                // it is size * page because I need to check one page in advance
                if (size * page > categoriesCount)
                {
                    hasNext = false;
                }

                // # To do
                int howManyToSkip = size * (page - 1);

                if (howManyToSkip >= categoriesCount)
                    return BadRequest("Out of range page and/or size parameters.");

                var categories = await _context.Categories
                    .Include(e => e.BlogPosts)
                    .Skip(howManyToSkip)
                    .Take(size)
                    .ToListAsync();

                var categoriesDto = _mapper.Map<ReturnCategoriesDto>(categories);

                return Ok(categoriesDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Blog Posts GET: {ex.Message}");
                if (ex.GetBaseException() is DbUpdateException)
                {
                    return BadRequest();
                }
                return StatusCode(500);
            }
        }

        // GET: api/Categories/5
        // GET REQUEST THAT WILL RETURN BLOGPOST
        //[HttpGet("{id}")]
        //public async Task<ActionResult<ReturnCategoryDto>> GetCategory(int id)
        //{
        //    try
        //    {
        //        if (!await CategoryExists(id))
        //        {
        //            return BadRequest();
        //        }
        //        var category = _context.Categories
        //            .Include(e => e.BlogPosts)
        //            .SingleAsync(e => e.Id == id); ;

        //        var categoryDto = _mapper.Map<ReturnCategoryDto>(category);

        //        return Ok(categoryDto);
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex, $"Blog Posts GET: {ex.Message}");
        //        if (ex.GetBaseException() is DbUpdateException)
        //        {
        //            return BadRequest();
        //        }
        //        return StatusCode(500);
        //    }

        //}

        //PUT: api/Categories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, UpdateCategoryDto categoryDto)
        {
            return Ok();
        }

        // POST: api/Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult> PostCategory(CreateCategoryDto categoryDto)
        {
            return Ok();
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            return Ok();
        }

        private async Task<bool> CategoryExists(int id)
        {
            return await _context.Categories.AnyAsync(e => e.Id == id);
        }
    }
}
