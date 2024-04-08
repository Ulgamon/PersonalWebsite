using System.ComponentModel.DataAnnotations;

namespace PersonalWebsite.API.Models.Comments
{
    public class UpdateCommentDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(100, ErrorMessage = "Cannot enter more than 100 characters.")]
        [MinLength(3, ErrorMessage = "Cannot enter less than 3 characters.")]
        public string Name { get; set; } = null!;

        [Required]
        [MaxLength(100, ErrorMessage = "Cannot enter more than 100 characters.")]
        [MinLength(3, ErrorMessage = "Cannot enter less than 3 characters.")]
        public string Comment1 { get; set; } = null!;

        public void Trim()
        {
            Name = Name.Trim();
            Comment1 = Comment1.Trim();
        }
    }
}
