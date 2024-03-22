using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using PersonalWebsite.API.Configurations;
using PersonalWebsite.API.Controllers;
using PersonalWebsite.API.Data;
using PersonalWebsite.API.Models.BlogPosts;
using PersonalWebsite.API.Models.Categories;
using PersonalWebsite.API.Models.Comments;
using PersonalWebsite.API.Models.Searches;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalWebsite.Test.Controllers
{
    public class SearchControllersTest
    {
        private readonly ILogger<SearchController> _logger;
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

                // CREATE 11 Categories
                if (await databaseContext.Categories.CountAsync() <= 0)
                {
                    for (int i = 1; i <= 11; i++)
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
                // Add i-th comment to the j-th blog post
                int ii = 11;
                int jj = 3;
                var comment = await databaseContext.Categories.Where(e => e.Id == ii).FirstAsync();
                var itemm = await databaseContext.Categories.FindAsync(ii);
                var blogPost = await databaseContext.BlogPosts.Where(e => e.Id == jj).FirstAsync();
                blogPost.Categories.Add(comment);
                await databaseContext.SaveChangesAsync();

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

        public SearchControllersTest()
        {

            // Mock ILogger Interface
            var loggerMock = new Mock<ILogger<SearchController>>();
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
        public async void POST_BlogPosts_Search_With_Valid_Parameters()
        {
            // Arrange
            PersonalWebsiteDevelopmentDbContext context = await GetDatabaseContext();
            SearchController controller = new SearchController(context, _logger, _mapper);

            // Act
            // Will create With empty parameters to 
            GetSearchDto param = new GetSearchDto { };
            
            ActionResult<PaginateBlogPostsDto> response = await controller.SearchBlogPosts(param);

            // Assert
            OkObjectResult okObjectResult = Assert.IsType<OkObjectResult>(response.Result);
            PaginateBlogPostsDto model = Assert.IsType<PaginateBlogPostsDto>(okObjectResult.Value);
            Assert.NotNull(model);
            Assert.Equal(10, model.BlogPostsDtos.Count);
            Assert.Equal(10, model.NumberOfElements);
            Assert.False(model.HasNext);
            Assert.False(model.HasPrev);
        }
        [Fact]
        public async void POST_BlogPosts_Search_With_NonExistent_Search_Parameter()
        {
            // Arrange
            PersonalWebsiteDevelopmentDbContext context = await GetDatabaseContext();
            SearchController controller = new SearchController(context, _logger, _mapper);

            // Act
            // Will create With empty parameters to 
            GetSearchDto param = new GetSearchDto { Search = "asdfhkjdsjfkdlsjfsdjaf;lkdjfsa;lf" };

            ActionResult<PaginateBlogPostsDto> response = await controller.SearchBlogPosts(param);

            // Assert
            OkObjectResult okObjectResult = Assert.IsType<OkObjectResult>(response.Result);
            PaginateBlogPostsDto model = Assert.IsType<PaginateBlogPostsDto>(okObjectResult.Value);
            Assert.NotNull(model);
            Assert.Empty(model.BlogPostsDtos);
            Assert.Equal(0, model.NumberOfElements);
            Assert.False(model.HasNext);
            Assert.False(model.HasPrev);
        }

        [Fact]
        public async void POST_BlogPosts_Search_With_NonExistent_Category_Parameter()
        {
            // Arrange
            PersonalWebsiteDevelopmentDbContext context = await GetDatabaseContext();
            SearchController controller = new SearchController(context, _logger, _mapper);

            // Act
            // Will create With empty parameters to 
            GetSearchDto param = new GetSearchDto { 
                Categories = new List<ReturnCategoriesDto> { 
                    new ReturnCategoriesDto { 
                        Id = 50, 
                        CategoryName = "Non Existent Category", 
                        Description = "------", 
                        NumberOfBlogPosts = 10
                    } 
                } 
            };

            ActionResult<PaginateBlogPostsDto> response = await controller.SearchBlogPosts(param);

            // Assert
            OkObjectResult okObjectResult = Assert.IsType<OkObjectResult>(response.Result);
            PaginateBlogPostsDto model = Assert.IsType<PaginateBlogPostsDto>(okObjectResult.Value);
            Assert.NotNull(model);
            Assert.Empty(model.BlogPostsDtos);
            Assert.Equal(0, model.NumberOfElements);
            Assert.False(model.HasNext);
            Assert.False(model.HasPrev);
        }

        [Fact]
        public async void POST_BlogPosts_Search_With_Valid_Category_Parameter()
        {
            // Arrange
            PersonalWebsiteDevelopmentDbContext context = await GetDatabaseContext();
            SearchController controller = new SearchController(context, _logger, _mapper);

            // Act
            // Will create With empty parameters to 
            GetSearchDto param = new GetSearchDto
            {
                Categories = new List<ReturnCategoriesDto> {
                    new ReturnCategoriesDto {
                        Id = 11,
                        // These fields aren't important
                        CategoryName = "Non Existent Category",
                        Description = "------",
                        NumberOfBlogPosts = 10
                    },
                    new ReturnCategoriesDto {
                        Id = 3,
                        // These fields aren't important
                        CategoryName = "Non Existent Category",
                        Description = "------",
                        NumberOfBlogPosts = 10
                    }
                }
            };

            ActionResult<PaginateBlogPostsDto> response = await controller.SearchBlogPosts(param);

            // Assert
            OkObjectResult okObjectResult = Assert.IsType<OkObjectResult>(response.Result);
            PaginateBlogPostsDto model = Assert.IsType<PaginateBlogPostsDto>(okObjectResult.Value);
            Assert.NotNull(model);
            Assert.Single(model.BlogPostsDtos);
            Assert.Equal(1, model.NumberOfElements);
            Assert.Equal(3, model.BlogPostsDtos.First().Id);
            Assert.False(model.HasNext);
            Assert.False(model.HasPrev);
        }

        [Fact]
        public async void POST_BlogPosts_Search_With_Valid_String_Parameter()
        {
            // Arrange
            PersonalWebsiteDevelopmentDbContext context = await GetDatabaseContext();
            SearchController controller = new SearchController(context, _logger, _mapper);

            // Act
            // Will create With empty parameters to 
            GetSearchDto param = new GetSearchDto { Search = "blogpost" };

            ActionResult<PaginateBlogPostsDto> response = await controller.SearchBlogPosts(param);

            // Assert
            OkObjectResult okObjectResult = Assert.IsType<OkObjectResult>(response.Result);
            PaginateBlogPostsDto model = Assert.IsType<PaginateBlogPostsDto>(okObjectResult.Value);
            Assert.NotNull(model);
            Assert.Equal(10, model.BlogPostsDtos.Count);
            Assert.Equal(10, model.NumberOfElements);
            Assert.False(model.HasNext);
            Assert.False(model.HasPrev);
        }

        [Fact]
        public async void POST_BlogPosts_Search_With_Specific_Valid_String_Parameter()
        {
            // Arrange
            PersonalWebsiteDevelopmentDbContext context = await GetDatabaseContext();
            SearchController controller = new SearchController(context, _logger, _mapper);

            // Act
            // Will create With empty parameters to 
            GetSearchDto param = new GetSearchDto { Search = "blogpost 4" };

            ActionResult<PaginateBlogPostsDto> response = await controller.SearchBlogPosts(param);

            // Assert
            OkObjectResult okObjectResult = Assert.IsType<OkObjectResult>(response.Result);
            PaginateBlogPostsDto model = Assert.IsType<PaginateBlogPostsDto>(okObjectResult.Value);
            Assert.NotNull(model);
            Assert.Single(model.BlogPostsDtos);
            Assert.Equal(1, model.NumberOfElements);
            Assert.False(model.HasNext);
            Assert.False(model.HasPrev);
        }

        [Fact]
        public async void POST_BlogPosts_Search_With_Specific_Valid_Parameters()
        {
            // Arrange
            PersonalWebsiteDevelopmentDbContext context = await GetDatabaseContext();
            SearchController controller = new SearchController(context, _logger, _mapper);

            // Act
            // Will create With empty parameters to 
            GetSearchDto param = new GetSearchDto { Search = "blogpost 4", 
                Categories = new List<ReturnCategoriesDto>{
                    new ReturnCategoriesDto {
                        Id = 4,
                        // These fields aren't important
                        CategoryName = "Non Existent Category",
                        Description = "------",
                        NumberOfBlogPosts = 10
                    },
                }
            };

            ActionResult<PaginateBlogPostsDto> response = await controller.SearchBlogPosts(param);

            // Assert
            OkObjectResult okObjectResult = Assert.IsType<OkObjectResult>(response.Result);
            PaginateBlogPostsDto model = Assert.IsType<PaginateBlogPostsDto>(okObjectResult.Value);
            Assert.NotNull(model);
            Assert.Single(model.BlogPostsDtos);
            Assert.Equal(1, model.NumberOfElements);
            Assert.False(model.HasNext);
            Assert.False(model.HasPrev);
        }
        [Fact]
        public async void POST_BlogPosts_Search_With_Invalid_Parameters()
        {
            // Arrange
            PersonalWebsiteDevelopmentDbContext context = await GetDatabaseContext();
            SearchController controller = new SearchController(context, _logger, _mapper);

            // Act
            // Will create With empty parameters to 
            GetSearchDto param = new GetSearchDto { Search = "fdjslkafjdlksafjlkdsjfsl;ajfld;kaj",
                Categories = new List<ReturnCategoriesDto>{
                    new ReturnCategoriesDto
                    {
                        Id = 50,
                        // These fields aren't important
                        CategoryName = "Non Existent Category",
                        Description = "------",
                        NumberOfBlogPosts = 10
                    },
                }
            };

            ActionResult<PaginateBlogPostsDto> response = await controller.SearchBlogPosts(param);

            // Assert
            OkObjectResult okObjectResult = Assert.IsType<OkObjectResult>(response.Result);
            PaginateBlogPostsDto model = Assert.IsType<PaginateBlogPostsDto>(okObjectResult.Value);
            Assert.NotNull(model);
            Assert.Empty(model.BlogPostsDtos);
            Assert.Equal(0, model.NumberOfElements);
            Assert.False(model.HasNext);
            Assert.False(model.HasPrev);
        }


    }
}
