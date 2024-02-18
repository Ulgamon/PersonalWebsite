using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using PersonalWebsite.API.Configurations;
using PersonalWebsite.API.Controllers;
using PersonalWebsite.API.Data;
using PersonalWebsite.API.Models.Categories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalWebsite.Test.Controllers
{
    public class CategoriesControllersTest
    {
        private readonly ILogger<CategoriesController> _logger;
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

        public CategoriesControllersTest()
        {

            // Mock ILogger Interface
            var loggerMock = new Mock<ILogger<CategoriesController>>();
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

        [Fact]
        public async void Http_GET_Categories_Default()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CategoriesController(context, _logger, _mapper);

            // Act
            ActionResult<IList<ReturnCategoriesDto>> categories = await controller.GetCategories();
            // Assert
            OkObjectResult okObjectResult = Assert.IsType<OkObjectResult>(categories.Result);
            IList<ReturnCategoriesDto> models = Assert.IsType<IList<ReturnCategoriesDto>>(okObjectResult.Value);
            Assert.NotNull(models);
            Assert.True(models.Count() == 5);
            Assert.True(1 == models.First().NumberOfBlogPosts);
        }

        [Fact]
        public async void Http_GET_Categories_Size12_Page1()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CategoriesController(context, _logger, _mapper);

            // Act
            ActionResult<IList<ReturnCategoriesDto>> categories = await controller.GetCategories(12, 1);
            // Assert
            OkObjectResult okObjectResult = Assert.IsType<OkObjectResult>(categories.Result);
            IList<ReturnCategoriesDto> models = Assert.IsType<IList<ReturnCategoriesDto>>(okObjectResult.Value);
            Assert.NotNull(models);
            Assert.True(models.Count() == 10);

            Assert.True(1 == models.First().NumberOfBlogPosts);
        }

        [Fact]
        public async void Http_GET_Categories_Size12_Page3()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CategoriesController(context, _logger, _mapper);

            // Act
            ActionResult<IList<ReturnCategoriesDto>> categories = await controller.GetCategories(12, 3);
            // Assert
            Assert.IsType<BadRequestResult>(categories.Result);
        }

        [Fact]
        public async void Http_GET_Categories_SizeMinus10_PageMinus3()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CategoriesController(context, _logger, _mapper);

            // Act
            ActionResult<IList<ReturnCategoriesDto>> categories = await controller.GetCategories(-10, -3);
            // Assert
            Assert.IsType<BadRequestResult>(categories.Result);
        }

        // Test PUT Requests
        [Fact]
        public async void Http_PUT_Category_With_Correct_Id()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CategoriesController(context, _logger, _mapper);

            // Act
            int id = 5;
            UpdateCategoryDto model = new UpdateCategoryDto
            {
                Id = id,
                CategoryName = "KATEGORIJA",
                Description = "Odllicna Kategorija"
            };
            var response = await controller.PutCategory(id, model);

            // Assert
            Assert.IsType<OkObjectResult>(response);
            Category? dbModel = await context.Categories.FindAsync(id);
            Assert.NotNull(dbModel);
            Assert.True(dbModel.Id == model.Id);
            Assert.True(dbModel.CategoryName == model.CategoryName);
            Assert.True(dbModel.Description == model.Description);
        }

        [Fact]
        public async void Http_PUT_Category_With_Incorrect_Id()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CategoriesController(context, _logger, _mapper);

            // Act
            int id = 5;
            UpdateCategoryDto model = new UpdateCategoryDto
            {
                Id = id,
                CategoryName = "KATEGORIJA",
                Description = "Odllicna Kategorija"
            };
            var response = await controller.PutCategory(id, model);

            // Assert
            Assert.IsType<BadRequestResult>(response);
        }

        [Fact]
        public async void Http_PUT_Category_With_Incorrect_Ids()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CategoriesController(context, _logger, _mapper);

            // Act
            int id1 = 5;
            int id2 = 10;
            UpdateCategoryDto model = new UpdateCategoryDto
            {
                Id = id1,
                CategoryName = "KATEGORIJA",
                Description = "Odllicna Kategorija"
            };
            var response = await controller.PutCategory(id2, model);

            // Assert
            Assert.IsType<BadRequestResult>(response);
        }

        // POST Category
        [Fact]
        public async void Http_POST_Category_With_Correct_Data()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CategoriesController(context, _logger, _mapper);

            // Act
            CreateCategoryDto createModel = new CreateCategoryDto
            {
                CategoryName = "KATEGORIJA",
                Description = "Odllicna Kategorija"
            };
            var response = await controller.PostCategory(createModel);

            // Assert
            Assert.IsType<OkResult>(response);
            int maxId = await context.Categories.MaxAsync(e => e.Id);

            Category createdModel = await context.Categories
                .Where(e => e.Id == maxId)
                .FirstAsync();
            Assert.NotNull(createdModel);
            Assert.True(createdModel.CategoryName == createModel.CategoryName);
            Assert.True(createdModel.Description == createModel.Description);
        }

        [Fact]
        public async void Http_POST_Category_With_Incorrect_Data()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CategoriesController(context, _logger, _mapper);

            // Act
            CreateCategoryDto createModel = new CreateCategoryDto
            {
                CategoryName = "KA",
                Description = "Odllicna Kategorija"
            };
            var response = await controller.PostCategory(createModel);

            // Assert
            Assert.IsType<BadRequestResult>(response);
            int maxId = await context.Categories.MaxAsync(e => e.Id);

            Category createdModel = await context.Categories
                .Where(e => e.Id == maxId)
                .FirstAsync();
            Assert.NotNull(createdModel);
            Assert.True(createdModel.CategoryName == createModel.CategoryName);
            Assert.True(createdModel.Description == createModel.Description);
        }

        [Fact]
        public async void Http_DELETE_Category_With_Correct_Id()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CategoriesController(context, _logger, _mapper);

            // Act
            int id = 3;
            IActionResult response = await controller.DeleteCategory(id);

            // Assert
            Assert.IsType<OkObjectResult>(response);
            Category? model = await context.Categories.FindAsync(id);
            Assert.Null(model);
        }
    }
}
