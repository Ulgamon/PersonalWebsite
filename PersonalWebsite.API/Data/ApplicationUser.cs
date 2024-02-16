using Microsoft.AspNetCore.Identity;

namespace PersonalWebsite.API.Data
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<BlogPost> BlogPosts { get; } = new List<BlogPost>();
    }
}
