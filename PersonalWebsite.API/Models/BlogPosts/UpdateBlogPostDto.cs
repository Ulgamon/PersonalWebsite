using System.ComponentModel.DataAnnotations;

namespace PersonalWebsite.API.Models.BlogPosts
{
    public class UpdateBlogPostDto
    {
        public int Id { get; set; }

        [MaxLength(250, ErrorMessage = "Cannot enter more than 250 characters.")]
        [MinLength(5, ErrorMessage = "Cannot enter less than 5 characters.")]
        public string ImgUrl { get; set; } = null!;

        [MinLength(5, ErrorMessage = "Cannot enter less than 5 characters.")]
        public string BlogMdText { get; set; } = null!;

        [MaxLength(50, ErrorMessage = "Cannot enter more than 50 characters.")]
        [MinLength(5, ErrorMessage = "Cannot enter less than 5 characters.")]
        public string Title { get; set; } = null!;
    }
}
