using PersonalWebsite.API.Data;
using System.ComponentModel.DataAnnotations;

namespace PersonalWebsite.API.Models.Comments
{
    public class CreateCommentDto
    {
        [Required]
        [MaxLength(100, ErrorMessage = "Cannot enter more than 100 characters.")]
        [MinLength(3, ErrorMessage = "Cannot enter less than 3 characters.")]
        public string Name { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        [MaxLength(100, ErrorMessage = "Cannot enter more than 100 characters.")]
        [MinLength(3, ErrorMessage = "Cannot enter less than 3 characters.")]
        public string Comment1 { get; set; } = null!;

        public int? BlogPostId { get; set; }

        public int? CommentId { get; set; }

    }
}
