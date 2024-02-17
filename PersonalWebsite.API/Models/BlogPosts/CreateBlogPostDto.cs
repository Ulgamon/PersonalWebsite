namespace PersonalWebsite.API.Models.BlogPosts
{
    public class CreateBlogPostDto
    {
        public string ImgUrl { get; set; } = null!;

        public string BlogMdText { get; set; } = null!;

        public string Title { get; set; } = null!;

    }
}
