using System;
using System.Collections.Generic;

namespace PersonalWebsite.API.Data;

public partial class Comment
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Comment1 { get; set; } = null!;

    public int? BlogPostId { get; set; }

    public int? CommentId { get; set; }

    public DateTime CreatedDate { get; set; }

    public BlogPost? BlogPost { get; set; }

    public Comment? CommentNavigation { get; set; }

    public ICollection<Comment> InverseCommentNavigation { get; set; } = new List<Comment>();
}
