using AutoMapper;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using PersonalWebsite.API.Configurations;
using PersonalWebsite.API.Controllers;
using PersonalWebsite.API.Data;
using PersonalWebsite.API.Models.BlogPosts;
using PersonalWebsite.API.Models.Categories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalWebsite.Test.Controllers
{
    public class BlogPostsControllersTest
    {
        private readonly ILogger<BlogPostsController> _logger;
        private readonly IMapper _mapper;
        private async Task<PersonalWebsiteDevelopmentDbContext> GetDatabaseContext()
        {
            var dbOptions = new DbContextOptionsBuilder<PersonalWebsiteDevelopmentDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            PersonalWebsiteDevelopmentDbContext databaseContext = new PersonalWebsiteDevelopmentDbContext(dbOptions);

            await databaseContext.Database.EnsureCreatedAsync();
            try
            {
                // Create ONE DEFAULT USER FOR INMEMORYDATABASE
                await databaseContext.Users.AddAsync(new ApplicationUser
                {
                    Id = "toja",
                    Email = "Tojica",
                    
                });

                await databaseContext.SaveChangesAsync();

                // CREATE 10 Categories
                if (await databaseContext.Categories.CountAsync() <= 0)
                {
                    for (int i = 1; i <= 10; i++)
                    {
                        await databaseContext.Categories.AddAsync(
                            new Category
                            {
                                Id = i,
                                CategoryName = $"Category {i}",
                                Description = $"Description {i}"
                            }
                        );
                    }

                    await databaseContext.SaveChangesAsync();
                }

                // CREATE 10 BLOG POSTS AND ADD Categories to them
                if (await databaseContext.BlogPosts.CountAsync() <= 0)
                {
                    for (int i = 1; i <= 10; i++)
                    {
                        await databaseContext.BlogPosts.AddAsync(
                            new BlogPost
                            {
                                Id = i,
                                BlogMdText = $"# Hello World {i}",
                                Title = $"Good BlogPost {i}",
                                ImgUrl = $"http://localhost:1333/img{i}",
                                UserId = "toja",
                                Categories = new List<Category>
                                {
                                    await databaseContext.Categories.FindAsync(i),
                                }
                            }
                        );
                    }
                    await databaseContext.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw new InvalidDataException($"cannot create database blog posts: {ex.Message}");
            }
            
            return databaseContext;
        }

        public BlogPostsControllersTest()
        {

            // Mock ILogger Interface
            var loggerMock = new Mock<ILogger<BlogPostsController>>();
            _logger = loggerMock.Object;

            //// Mock IMapper Interface maybe this is the error
            //var mapperMock = new Mock<IMapper>();
            //_mapper = mapperMock.Object;
            var mapperConfig = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MapperConfig>();
            });
            _mapper = mapperConfig.CreateMapper();
        }


        // Tests FOR SINGLE POST FETCHED BY ID
        [Fact]
        public async void BlogPostsController_Http_Get_BlogPost()
        {
            // Arrange
            var context = await GetDatabaseContext();
            BlogPostsController controller = new BlogPostsController(context, _logger, _mapper);
            int id = 1;

            // Act

            ActionResult<ReturnBlogPostDto> response = await controller.GetBlogPost(id);

            // Assert
            OkObjectResult okObjectResult = Assert.IsType<OkObjectResult>(response.Result);
            ReturnBlogPostDto model = Assert.IsType<ReturnBlogPostDto>(okObjectResult.Value);
            Assert.NotNull(model);
            Assert.True(model.Id == id);
            Assert.IsType<List<ReturnCategoryDto>>(model.Categories);
            Assert.True(model.Categories.Count == 1);
            Assert.True(model.Categories.ElementAt(0).Id == id);
        }    

        [Fact]
        public async void BlogPostsController_Http_Get_NonExistent_BlogPost()
        {
            // Arrange
            var context = await GetDatabaseContext();
            BlogPostsController controller = new BlogPostsController(context, _logger, _mapper);
            int id = 600;

            // Act

            var response = await controller.GetBlogPost(id);

            ReturnBlogPostDto? blogPost = response.Value;

            // Assert
            NotFoundObjectResult notFoundObjectResult = Assert.IsType<NotFoundObjectResult>(response.Result);
            //response.
        }

        // TESTS FOR HTTP GET ROUTE "/api/BlogPosts" which can take parameters "page" and "size"
        [Fact]
        public async void BlogPostsController_Http_Get_BlogPosts()
        {
            // Arrange
            var context = await GetDatabaseContext();
            BlogPostsController controller = new BlogPostsController(context, _logger, _mapper);

            // Act
            ActionResult<PaginateBlogPostsDto> response = await controller.GetBlogPosts();

            // Assert
            OkObjectResult okObjectResult = Assert.IsType<OkObjectResult>(response.Result);
            PaginateBlogPostsDto model = Assert.IsType<PaginateBlogPostsDto>(okObjectResult.Value);
            Assert.NotNull(model);
            Assert.Equal(3, model.blogPostsDtos.Count);
            Assert.True(model.hasNext);
            Assert.False(model.hasPrev);
        }

        [Fact]
        public async void BlogPostsController_Http_Get_BlogPosts_WithQueryParameter_ThirdPage()
        {
            // Arrange
            var context = await GetDatabaseContext();
            BlogPostsController controller = new BlogPostsController(context, _logger, _mapper);

            // Act
            ActionResult<PaginateBlogPostsDto> response = await controller.GetBlogPosts(3, 3);

            // Assert
            OkObjectResult okObjectResult = Assert.IsType<OkObjectResult>(response.Result);
            PaginateBlogPostsDto model = Assert.IsType<PaginateBlogPostsDto>(okObjectResult.Value);
            Assert.NotNull(model);
            Assert.Equal(3, model.blogPostsDtos.Count);
            Assert.Equal(7, model.blogPostsDtos.ElementAt(0).Id);
            Assert.Equal(8, model.blogPostsDtos.ElementAt(1).Id);
            Assert.Equal(9, model.blogPostsDtos.ElementAt(2).Id);
            Assert.True(model.hasNext);
            Assert.True(model.hasPrev);
        }
        [Fact]
        public async void BlogPostsController_Http_Get_BlogPosts_WithQueryParameter_FourthPage()
        {
            // Arrange
            var context = await GetDatabaseContext();
            BlogPostsController controller = new BlogPostsController(context, _logger, _mapper);

            // Act
            ActionResult<PaginateBlogPostsDto> response = await controller.GetBlogPosts(3, 4);

            // Assert
            OkObjectResult okObjectResult = Assert.IsType<OkObjectResult>(response.Result);
            PaginateBlogPostsDto model = Assert.IsType<PaginateBlogPostsDto>(okObjectResult.Value);
            Assert.NotNull(model);
            Assert.Single(model.blogPostsDtos);
            Assert.Equal(1, model.blogPostsDtos.ElementAt(0).Id);
            Assert.False(model.hasNext);
            Assert.True(model.hasPrev);
        }

        [Fact]
        public async void BlogPostsController_Http_Get_BlogPosts_WithQueryParameter_FifthPage()
        {
            // Arrange
            var context = await GetDatabaseContext();
            BlogPostsController controller = new BlogPostsController(context, _logger, _mapper);

            // Act
            ActionResult<PaginateBlogPostsDto> response = await controller.GetBlogPosts(3, 5);

            // Assert
            BadRequestObjectResult errorObjectResult = Assert.IsType<BadRequestObjectResult>(response.Result);
            Assert.True("Out of range page and/or size parameters." == errorObjectResult.Value);
            
        }

        [Fact]
        public async void BlogPostsController_Http_Get_BlogPosts_WithQueryParameter_InvalidPageAndSize()
        {
            // Arrange
            var context = await GetDatabaseContext();
            BlogPostsController controller = new BlogPostsController(context, _logger, _mapper);

            // Act
            ActionResult<PaginateBlogPostsDto> response = await controller.GetBlogPosts(-3, -5);

            // Assert
            BadRequestObjectResult errorObjectResult = Assert.IsType<BadRequestObjectResult>(response.Result);
            Assert.True("Invalid size and/or page params should be size >= 1 and page >= 1." == errorObjectResult.Value);

        }
    }
}
