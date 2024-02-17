using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using PersonalWebsite.API.Configurations;
using PersonalWebsite.API.Controllers;
using PersonalWebsite.API.Data;
using PersonalWebsite.API.Models.BlogPosts;
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
                await databaseContext.Users.AddAsync(new ApplicationUser
                {
                    Id = "toja",
                    Email = "Tojica",
                    
                });

                await databaseContext.SaveChangesAsync();

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
                                UserId = "toja"
                            }
                        );

                        await databaseContext.SaveChangesAsync();
                    }
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

            // Mock IMapper Interface
            var mapperMock = new Mock<IMapper>();
            _mapper = mapperMock.Object;
        }
        [Fact]
        public async void BlogPostsController_Http_Get_BlogPost()
        {
            // Arrange
            var context = await GetDatabaseContext();
            BlogPostsController controller = new BlogPostsController(context, _logger, _mapper);
            int id = 1;

            // Act

            var response = await controller.GetBlogPost(id);

            ReturnBlogPostDto? blogPost = response.Value;

            // Assert
            Assert.NotNull(blogPost);
            Assert.Equal(typeof(ReturnBlogPostDto), blogPost.GetType());
            Assert.Equal(blogPost.Id, id);
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
            Assert.Null(blogPost);
            //response.
        }

        [Fact]
        public async void BlogPostsController_Http_Get_BlogPosts()
        {
            // Arrange
            var context = await GetDatabaseContext();
            BlogPostsController controller = new BlogPostsController(context, _logger, _mapper);

            // Act
            var response = await controller.GetBlogPosts();
            IEnumerable<ReturnBlogPostDto>? blogPosts = response.Value;

            // Assert
            Assert.Equal(10, blogPosts?.Count());
        }
    }
}
