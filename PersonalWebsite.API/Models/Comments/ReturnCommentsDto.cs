namespace PersonalWebsite.API.Models.Comments
{
    public class ReturnCommentsDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string Comment1 { get; set; } = null!;

        public int? BlogPostId { get; set; }

        public int? CommentId { get; set; }

        public DateTime CreatedDate { get; set; }

        public ICollection<ReturnCommentsDto> InverseCommentNavigation { get; set; } = new List<ReturnCommentsDto>();

    }
}
