﻿using AutoMapper;
using PersonalWebsite.API.Data;
using PersonalWebsite.API.Models.BlogPosts;
using PersonalWebsite.API.Models.Users;

namespace PersonalWebsite.API.Configurations
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            // Blog Posts Mapping
            CreateMap<BlogPost, ReturnBlogPostDto>().ReverseMap();
            CreateMap<BlogPost, CreateBlogPostDto>().ReverseMap();
            CreateMap<BlogPost, UpdateBlogPostDto>().ReverseMap();
            // User Model Mapping
            CreateMap<ApplicationUser, BlogPostUserDto>().ReverseMap();
        }
    }
}
