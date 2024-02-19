using PersonalWebsite.API.Data;
using System.ComponentModel.DataAnnotations;

namespace PersonalWebsite.API.Models.Users
{
    public class LoginApplicationUserDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;
    }
}
