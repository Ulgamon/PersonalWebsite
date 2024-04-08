using PersonalWebsite.API.Models.Categories;

namespace PersonalWebsite.API.Models.BlogPosts
{
    public class ReturnBlogPostDto
    {
        public int Id { get; set; }

        public string ImgUrl { get; set; } = null!;

        public string BlogMdText { get; set; } = null!;

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public DateTime PublishedDate { get; set; }

        public bool Published { get; set; }

        public string Title { get; set; } = null!;

        public ICollection<ReturnCategoryDto> Categories { get; set; } = new List<ReturnCategoryDto>();
    }
}
