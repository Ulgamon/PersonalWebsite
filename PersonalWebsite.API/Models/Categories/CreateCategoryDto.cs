using System.ComponentModel.DataAnnotations;

namespace PersonalWebsite.API.Models.Categories
{
    public class CreateCategoryDto
    {
        [Required]
        [MaxLength(50, ErrorMessage = "Cannot enter more than 50 characters.")]
        [MinLength(3, ErrorMessage = "Cannot enter less than 3 characters.")]
        public string CategoryName { get; set; } = null!;

        [Required]
        [MaxLength(500, ErrorMessage = "Cannot enter more than 500 characters.")]
        [MinLength(3, ErrorMessage = "Cannot enter less than 3 characters.")]
        public string Description { get; set; } = null!;
    }
}
