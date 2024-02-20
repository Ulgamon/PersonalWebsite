using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using PersonalWebsite.API.Configurations;
using PersonalWebsite.API.Controllers;
using PersonalWebsite.API.Data;
using PersonalWebsite.API.Models.Comments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalWebsite.Test.Controllers
{
    public class CommentsControllersTest
    {

        private readonly IMapper _mapper;
        private readonly ILogger<CommentsController> _logger;

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

                // ADD 10 Comments for BlogPost with id 3
                if (await databaseContext.Comments.CountAsync() <= 0)
                {
                    for (int i = 1; i <= 10; i++)
                    {
                        await databaseContext.Comments.AddAsync(
                            new Comment
                            {
                                Id = i,
                                BlogPostId = 3,
                                Comment1 = $"Comment number {i}.",
                                Email = $"test{i}@gmail.com",
                                Name = $"test{i}",
                            }
                        );
                    }
                    await databaseContext.SaveChangesAsync();
                }

                // Add four more nested Comments
                await databaseContext.Comments.AddAsync(
                    new Comment
                    {
                        Id = 12,
                        BlogPostId = 3,
                        Comment1 = "Comment number 12.",
                        Email = "test12@gmail.com",
                        Name = "test12",
                    }
                );
                await databaseContext.SaveChangesAsync();

                await databaseContext.Comments.AddAsync(
                    new Comment
                    {
                        Id = 13,
                        CommentId = 12,
                        Comment1 = "Comment number 12.",
                        Email = "test12@gmail.com",
                        Name = "test12",
                    }
                );
                await databaseContext.SaveChangesAsync();

                await databaseContext.Comments.AddAsync(
                    new Comment
                    {
                        Id = 14,
                        Comment1 = "Comment number 24.",
                        CommentId = 12,
                        Email = "test24@gmail.com",
                        Name = "test24",
                    }
                );
                await databaseContext.SaveChangesAsync();

                await databaseContext.Comments.AddAsync(
                    new Comment
                    {
                        Id = 25,
                        Comment1 = "Comment number 24.",
                        CommentId = 14,
                        Email = "test24@gmail.com",
                        Name = "test24",
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

        public CommentsControllersTest()
        {

            var mapperConfig = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MapperConfig>();
            });
            _mapper = mapperConfig.CreateMapper();

            var loggerMock = new Mock<ILogger<CommentsController>>();
            _logger = loggerMock.Object;
        }

        [Fact]
        public async void GET_Comments_For_Existent_BlogPost_Id()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CommentsController(context, _logger, _mapper);

            // Act

            // Assert
        }

        [Fact]
        public async void GET_Comments_For_NonExistent_BlogPost_Id()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CommentsController(context, _logger, _mapper);

            // Act

            // Assert
        }

        [Fact]
        public async void GET_Comment_With_Valid_Id()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CommentsController(context, _logger, _mapper);

            // Act

            // Assert
        }

        [Fact]
        public async void GET_Comment_With_Invalid_Id()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CommentsController(context, _logger, _mapper);

            // Act

            // Assert
        }

        [Fact]
        public async void PUT_Comment_With_Valid_Id_And_Valid_Value()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CommentsController(context, _logger, _mapper);

            // Act

            // Assert
        }

        [Fact]
        public async void PUT_Comment_With_Invalid_Id_And_Invalid_Value()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CommentsController(context, _logger, _mapper);

            // Act

            // Assert
        }

        [Fact]
        public async void PUT_Comment_With_Invalid_Id_And_Valid_Value()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CommentsController(context, _logger, _mapper);

            // Act

            // Assert
        }

        [Fact]
        public async void POST_Comment_With_Valid_Value()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CommentsController(context, _logger, _mapper);

            // Act

            // Assert
        }

        [Fact]
        public async void POST_Comment_With_Invalid_ForeignKeys_Both_Null()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CommentsController(context, _logger, _mapper);

            // Act
            CreateCommentDto createComment = new CreateCommentDto
            {
                Comment1 = "SOMETHINGSOMETHING",
                Email = "gmail@gmail.com",
                Name = "Gmail",
            };
            int id = 11;
            var response = await controller.PostComment(createComment);
            var createdComment = await context.Comments.FindAsync(11);
            // Assert
            
            Assert.IsType<BadRequestResult>(response);
        }

        [Fact]
        public async void DELETE_Comment_With_Valid_Id_Attached_To_BlogPost()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CommentsController(context, _logger, _mapper);

            // Act
            int id = 3;
            var response = await controller.DeleteComment(id);
            Comment? deletedComment = await context.Comments.FindAsync(id);

            // Assert
            Assert.IsType<OkResult>(response);
            Assert.Null(deletedComment);
        }

        [Fact]
        public async void DELETE_Comment_With_Valid_Id_Attached_To_Comment()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CommentsController(context, _logger, _mapper);

            // Act
            int id = 14;
            int attachedId = 25;
            var response = await controller.DeleteComment(id);
            Comment? deletedComment = await context.Comments.FindAsync(id);
            Comment? attachedToDeleted = await context.Comments.FindAsync(attachedId);

            // Assert
            Assert.IsType<OkResult>(response);
            Assert.Null(deletedComment);
            Assert.Null(attachedToDeleted);
        }

        [Fact]
        public async void DELETE_Comment_With_Invalid_Id()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CommentsController(context, _logger, _mapper);

            // Act
            int id = 666;
            var response = await controller.DeleteComment(id);
            Comment? deletedComment = await context.Comments.FindAsync(id);

            // Assert
            Assert.IsType<BadRequestResult>(response);
            Assert.Null(deletedComment);
        }
    }
}
