using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
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
    public class AuthControllersTest
    {
        private readonly ILogger<AuthController> _logger;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;

        private async Task<PersonalWebsiteDevelopmentDbContext> GetDatabaseContext()
        {
            var dbOptions = new DbContextOptionsBuilder<PersonalWebsiteDevelopmentDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            PersonalWebsiteDevelopmentDbContext databaseContext = new PersonalWebsiteDevelopmentDbContext(dbOptions);

            await databaseContext.Database.EnsureCreatedAsync();
            try
            {
                //// Create Role
                //await databaseContext.Roles.AddAsync(new IdentityRole
                //{
                //    Name = "User",
                //    NormalizedName = "USER",
                //    Id = "f2a04be0-60e2-4835-b0ea-4ac09e8449c5"
                //});
                //await databaseContext.Roles.AddAsync(new IdentityRole
                //{
                //    Name = "Administrator",
                //    NormalizedName = "ADMINISTRATOR",
                //    Id = "5424f84e-ebad-491f-bf86-96903dbaf476"
                //});
                //// Create ONE DEFAULT USER FOR INMEMORYDATABASE
                //var hasher = new PasswordHasher<ApplicationUser>();
               
                //await databaseContext.Users.AddAsync(new ApplicationUser
                //{
                //    Id = "37ca6d9e-a698-4cc8-8655-9ad6d1670593",
                //    Email = "test@gmail.com",
                //    NormalizedEmail = "TEST@GMAIL.COM",
                //    UserName = "test@gmail.com",
                //    PasswordHash = hasher.HashPassword(null, "P@ssword123")
                //});
                //await databaseContext.SaveChangesAsync();

                //await databaseContext.UserRoles.AddAsync(new IdentityUserRole<string>
                //{
                //    RoleId = "5424f84e-ebad-491f-bf86-96903dbaf476",
                //    UserId = "37ca6d9e-a698-4cc8-8655-9ad6d1670593"
                //});

                //await databaseContext.SaveChangesAsync();

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
                        var item = await databaseContext.Categories.FindAsync(i);
                        if (item == null) continue;
                        await databaseContext.BlogPosts.AddAsync(
                            new BlogPost
                            {
                                Id = i,
                                BlogMdText = $"# Hello World {i}",
                                Title = $"Good BlogPost {i}",
                                ImgUrl = $"http://localhost:1333/img{i}",
                                UserId = "toja",
                                Published = true,
                                Categories = new List<Category>
                                {
                                    item
                                }
                            }
                        );
                    }
                    await databaseContext.SaveChangesAsync();
                }

                // Add another one BlogPost that is not Published for the tests to be correct
                int num = 55;
                var category = await databaseContext.Categories.FindAsync(10);
                await databaseContext.BlogPosts.AddAsync(
                           new BlogPost
                           {
                               Id = num,
                               BlogMdText = $"# Hello World {num}",
                               Title = $"Good BlogPost {num}",
                               ImgUrl = $"http://localhost:1333/img{num}",
                               UserId = "toja",
                               Categories = new List<Category>
                               {
                                    category
                               }
                           }
                       );

                await databaseContext.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                throw new InvalidDataException($"cannot create database blog posts: {ex.Message}");
            }

            return databaseContext;
        }

        public AuthControllersTest()
        {

            // Mock ILogger Interface
            var loggerMock = new Mock<ILogger<AuthController>>();
            _logger = loggerMock.Object;

            var userManagerMock = new Mock<UserManager<ApplicationUser>>(
                new Mock<IUserStore<ApplicationUser>>().Object,
                new Mock<IOptions<IdentityOptions>>().Object,
                new Mock<IPasswordHasher<ApplicationUser>>().Object,
                new IUserValidator<ApplicationUser>[0],
                new IPasswordValidator<ApplicationUser>[0],
                new Mock<ILookupNormalizer>().Object,
                new Mock<IdentityErrorDescriber>().Object,
                new Mock<IServiceProvider>().Object,
                new Mock<ILogger<UserManager<ApplicationUser>>>().Object);
            _userManager = userManagerMock.Object;

            var configurationMock = new Mock<IConfiguration>();
            _configuration = configurationMock.Object;
            // Add userManager
            //_userManager = new UserManager<ApplicationUser>();

            //// Mock IMapper Interface maybe this is the error
            //var mapperMock = new Mock<IMapper>();
            //_mapper = mapperMock.Object;
            var mapperConfig = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MapperConfig>();
            });
            _mapper = mapperConfig.CreateMapper();
        }

        [Fact]
        public async void GET_BlogPosts_Authenticated()
        {
            // Arrange
            var context = await GetDatabaseContext();
            AuthController controller = new AuthController(_userManager, context, _logger, _mapper, _configuration);

            // Act
            ActionResult<PaginateBlogPostsDto> response = await controller.GetAuthBlogPosts();

            // Assert
            OkObjectResult okObjectResult = Assert.IsType<OkObjectResult>(response.Result);
            PaginateBlogPostsDto model = Assert.IsType<PaginateBlogPostsDto>(okObjectResult.Value);
            Assert.NotNull(model);
            Assert.Equal(3, model.BlogPostsDtos.Count);
            Assert.True(model.HasNext);
            Assert.False(model.HasPrev);
        }

        [Fact]
        public async void GET_BlogPosts_WithQueryParameter_ThirdPage()
        {
            // Arrange
            var context = await GetDatabaseContext();
            AuthController controller = new AuthController(_userManager, context, _logger, _mapper, _configuration);

            // Act
            ActionResult<PaginateBlogPostsDto> response = await controller.GetAuthBlogPosts(3, 3);

            // Assert
            OkObjectResult okObjectResult = Assert.IsType<OkObjectResult>(response.Result);
            PaginateBlogPostsDto model = Assert.IsType<PaginateBlogPostsDto>(okObjectResult.Value);
            Assert.NotNull(model);
            Assert.Equal(3, model.BlogPostsDtos.Count);
            Assert.Equal(4, model.BlogPostsDtos.ElementAt(0).Id);
            Assert.Equal(3, model.BlogPostsDtos.ElementAt(1).Id);
            Assert.Equal(2, model.BlogPostsDtos.ElementAt(2).Id);
            Assert.True(model.HasNext);
            Assert.True(model.HasPrev);
        }

        [Fact]
        public async void GET_BlogPosts_WithQueryParameter_FourthPage()
        {
            // Arrange
            var context = await GetDatabaseContext();
            AuthController controller = new AuthController(_userManager, context, _logger, _mapper, _configuration);

            // Act
            ActionResult<PaginateBlogPostsDto> response = await controller.GetAuthBlogPosts(3, 4);

            // Assert
            OkObjectResult okObjectResult = Assert.IsType<OkObjectResult>(response.Result);
            PaginateBlogPostsDto model = Assert.IsType<PaginateBlogPostsDto>(okObjectResult.Value);
            Assert.NotNull(model);
            Assert.Equal(2, model.BlogPostsDtos.Count);
            Assert.Equal(1, model.BlogPostsDtos.ElementAt(0).Id);
            Assert.False(model.HasNext);
            Assert.True(model.HasPrev);
        }

        [Fact]
        public async void GET_BlogPosts_WithQueryParameter_FifthPage()
        {
            // Arrange
            var context = await GetDatabaseContext();
            AuthController controller = new AuthController(_userManager, context, _logger, _mapper, _configuration);

            // Act
            ActionResult<PaginateBlogPostsDto> response = await controller.GetAuthBlogPosts(3, 5);

            // Assert
            BadRequestObjectResult errorObjectResult = Assert.IsType<BadRequestObjectResult>(response.Result);
            Assert.Equal("Out of range page and/or size parameters.", errorObjectResult.Value);

        }

        [Fact]
        public async void GET_BlogPosts_WithQueryParameter_InvalidPageAndSize()
        {
            // Arrange
            var context = await GetDatabaseContext();
            AuthController controller = new AuthController(_userManager, context, _logger, _mapper, _configuration);

            // Act
            ActionResult<PaginateBlogPostsDto> response = await controller.GetAuthBlogPosts(-3, -5);

            // Assert
            BadRequestObjectResult errorObjectResult = Assert.IsType<BadRequestObjectResult>(response.Result);
            Assert.Equal("Invalid size and/or page params should be size >= 1 and page >= 1.", errorObjectResult.Value);

        }
    }
}
