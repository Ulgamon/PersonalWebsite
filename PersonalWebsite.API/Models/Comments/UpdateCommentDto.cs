using PersonalWebsite.API.Data;
using System.ComponentModel.DataAnnotations;

namespace PersonalWebsite.API.Models.Comments
{
    public class UpdateCommentDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength()]
        public string Name { get; set; } = null!;

        public string Comment1 { get; set; } = null!;

    }
}
