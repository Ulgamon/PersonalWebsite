namespace PersonalWebsite.API.Models.Categories
{
    public class PaginateCategoriesDto
    {
        public int CurrentPage { get; set; } = 1;
        public bool HasPrev { get; set; }
        public bool HasNext { get; set; }

        public ICollection<ReturnCategoriesDto> Categories { get; set; } = new List<ReturnCategoriesDto>();
    }
}
