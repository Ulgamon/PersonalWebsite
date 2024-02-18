namespace PersonalWebsite.API.Models.BlogPosts
{
    public class PaginateBlogPostsDto
    {
        public ICollection<ReturnBlogPostsDto> blogPostsDtos { get; set; } = null!;

        public bool hasPrev { get; set; }

        public bool hasNext { get; set; }
    }
}
