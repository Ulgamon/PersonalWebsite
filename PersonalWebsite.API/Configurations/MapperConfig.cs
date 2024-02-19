using AutoMapper;
using PersonalWebsite.API.Data;
using PersonalWebsite.API.Models.BlogPosts;
using PersonalWebsite.API.Models.Categories;
using PersonalWebsite.API.Models.Users;

namespace PersonalWebsite.API.Configurations
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            // Blog Posts Mapping
            CreateMap<BlogPost, ReturnBlogPostDto>().ReverseMap();
            CreateMap<BlogPost, ReturnBlogPostsDto>().ReverseMap();
            CreateMap<BlogPost, CreateBlogPostDto>().ReverseMap();
            CreateMap<BlogPost, UpdateBlogPostDto>().ReverseMap();
            // User Model Mapping
            CreateMap<ApplicationUser, BlogPostUserDto>().ReverseMap();

            // Category Model Mapping
            CreateMap<Category, ReturnCategoryDto>().ReverseMap();
            CreateMap<Category, ReturnCategoriesDto>()
                .ForMember(
                    dest => dest.NumberOfBlogPosts, 
                    opt => opt.MapFrom(src => src.BlogPosts.Count)
                );
            CreateMap<ReturnCategoriesDto, Category>();
            CreateMap<Category, UpdateCategoryDto>().ReverseMap();
            CreateMap<Category, CreateCategoryDto>().ReverseMap();
        }
    }
}
