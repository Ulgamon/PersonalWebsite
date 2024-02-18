namespace PersonalWebsite.API.Models.BlogPosts
{
    public class ReturnBlogPostsDto
    {
        public int Id { get; set; }

        public string ImgUrl { get; set; } = null!;

        public string BlogMdText { get; set; } = null!;

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public string Title { get; set; } = null!;
    }
}
