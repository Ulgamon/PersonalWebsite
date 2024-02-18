namespace PersonalWebsite.API.Models.Categories
{
    public class UpdateCategoryDto
    {
        public int Id { get; set; }

        public string CategoryName { get; set; } = null!;

        public string Description { get; set; } = null!;
    }
}
