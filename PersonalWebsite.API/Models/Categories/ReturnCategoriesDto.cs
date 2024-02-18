using PersonalWebsite.API.Data;

namespace PersonalWebsite.API.Models.Categories
{
    public class ReturnCategoriesDto
    {
        public int Id { get; set; }

        public string CategoryName { get; set; } = null!;

        public string Description { get; set; } = null!;

        public ICollection<BlogPost> BlogPosts { get; set; } = new List<BlogPost>();
    }
}
