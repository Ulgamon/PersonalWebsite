namespace PersonalWebsite.API.Models.Comments
{
    public class PaginateCommentsDto
    {
        public int CurrentPage { get; set; } = 1;
        public bool HasPrev { get; set; }
        public bool HasNext { get; set; }
        public ICollection<ReturnCommentsDto> Comments { get; set; } = new List<ReturnCommentsDto>();
    }
}
