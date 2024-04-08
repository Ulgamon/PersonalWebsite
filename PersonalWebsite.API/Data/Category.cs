namespace PersonalWebsite.API.Data;

public partial class Category
{
    public int Id { get; set; }

    public string CategoryName { get; set; } = null!;

    public string Description { get; set; } = null!;

    public ICollection<BlogPost> BlogPosts { get; set; } = new List<BlogPost>();
}
