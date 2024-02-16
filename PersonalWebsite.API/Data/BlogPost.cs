﻿using System;
using System.Collections.Generic;

namespace PersonalWebsite.API.Data;

public partial class BlogPost
{
    public int Id { get; set; }

    public string ImgUrl { get; set; } = null!;

    public string BlogMdText { get; set; } = null!;

    public DateTime CreatedDate { get; set; }

    public DateTime UpdatedDate { get; set; }

    public string Title { get; set; } = null!;

    public string UserId { get; set; } = null!;

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual AspNetUser User { get; set; } = null!;

    public virtual ICollection<Category> Categories { get; set; } = new List<Category>();
}
