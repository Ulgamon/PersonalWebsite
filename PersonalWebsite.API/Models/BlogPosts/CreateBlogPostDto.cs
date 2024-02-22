using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using PersonalWebsite.API.Models.Categories;
using System.ComponentModel.DataAnnotations;

namespace PersonalWebsite.API.Models.BlogPosts
{
    public class CreateBlogPostDto
    {
        [Required]
        [MaxLength(250, ErrorMessage = "Cannot enter more than 250 characters.")]
        [MinLength(5, ErrorMessage = "Cannot enter less than 5 characters.")]
        public string ImgUrl { get; set; } = null!;

        [Required]
        [MinLength(5, ErrorMessage = "Cannot enter less than 5 characters.")]
        public string BlogMdText { get; set; } = null!;

        [Required]
        [MaxLength(50, ErrorMessage = "Cannot enter more than 50 characters.")]
        [MinLength(5, ErrorMessage = "Cannot enter less than 5 characters.")]
        public string Title { get; set; } = null!;

        public ICollection<ReturnCategoryDto> Categories { get; set; } = new List<ReturnCategoryDto>();


        public void Trim()
        {
            ImgUrl = ImgUrl.Trim();
            BlogMdText = BlogMdText.Trim();
            Title = Title.Trim();
        }
    }
}
