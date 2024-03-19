using PersonalWebsite.API.Models.Categories;

namespace PersonalWebsite.API.Models.Searches
{
    public class GetSearchDto
    {
        public ICollection<ReturnCategoriesDto> Categories { get; set; } = new List<ReturnCategoriesDto>();
        
        public string? Search { get; set; }
    }
}
