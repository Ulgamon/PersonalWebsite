namespace PersonalWebsite.API.Models.BlogPosts
{
    public class PaginateBlogPostsDto
    {
        public ICollection<ReturnBlogPostsDto> BlogPostsDtos { get; set; } = null!;

        public int NumberOfElements { get; set; } = 0;

        public int CurrentPage { get; set; } = 1;

        public bool HasPrev { get; set; }

        public bool HasNext { get; set; }
    }
}
