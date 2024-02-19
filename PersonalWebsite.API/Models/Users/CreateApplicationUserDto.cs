using System.ComponentModel.DataAnnotations;

namespace PersonalWebsite.API.Models.Users
{
    public class CreateApplicationUserDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; } = null!;
    }
}
