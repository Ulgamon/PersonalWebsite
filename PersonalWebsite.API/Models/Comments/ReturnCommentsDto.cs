namespace PersonalWebsite.API.Models.Comments
{
    public class ReturnCommentsDto
    {

        public int CurrentPage { get; set; } = 1;
        public bool HasPrev { get; set; }
        public bool HasNext { get; set; }
    }
}
