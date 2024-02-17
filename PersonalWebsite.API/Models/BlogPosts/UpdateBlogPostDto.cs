namespace PersonalWebsite.API.Models.BlogPosts
{
    public class UpdateBlogPostDto
    {
        public int Id { get; set; }

        public string ImgUrl { get; set; } = null!;

        public string BlogMdText { get; set; } = null!;

        public string Title { get; set; } = null!;
    }
}
