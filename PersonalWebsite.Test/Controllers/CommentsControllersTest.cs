﻿using AutoMapper;
using Azure;
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
        public async void GET_Comments_For_Existing_BlogPost_Id()
        {
            // Arrange
            PersonalWebsiteDevelopmentDbContext context = await GetDatabaseContext();
            CommentsController controller = new CommentsController(context, _logger, _mapper);

            // Act
            int blogId = 3;
            ActionResult<PaginateCommentsDto> response = await controller.GetComments(blogId);

            // Assert
            OkObjectResult objectResult = Assert.IsType<OkObjectResult>(response.Result);
            PaginateCommentsDto model = Assert.IsType<PaginateCommentsDto>(objectResult.Value);
            Assert.NotNull(model);
            Assert.Equal(1, model.CurrentPage);
            Assert.True(model.HasNext);
            Assert.False(model.HasPrev);
            ICollection<ReturnCommentsDto> comments = model.Comments;
            Assert.Equal(5, comments.Count);
        }

        [Fact]
        public async void GET_Comments_For_Existing_BlogPost_Id_Page3()
        {
            // Arrange
            PersonalWebsiteDevelopmentDbContext context = await GetDatabaseContext();
            CommentsController controller = new CommentsController(context, _logger, _mapper);

            // Act
            int blogId = 3;
            int page = 3;
            int size = 5;
            ActionResult<PaginateCommentsDto> response = await controller.GetComments(blogId, size, page);

            // Assert
            OkObjectResult objectResult = Assert.IsType<OkObjectResult>(response.Result);
            PaginateCommentsDto model = Assert.IsType<PaginateCommentsDto>(objectResult.Value);
            Assert.NotNull(model);
            Assert.Equal(model.CurrentPage, page);
            Assert.False(model.HasNext);
            Assert.True(model.HasPrev);
            ICollection<ReturnCommentsDto> comments = model.Comments;
            Assert.Single(comments);
            ReturnCommentsDto elZero = comments.ElementAt(0);
            Assert.IsType<ReturnCommentsDto>(elZero);
            // I have 12th comment attached to a BlogPost Id = 3
            // 12th comment has 2 comments attached to it
            var commentsForTwelve = elZero.InverseCommentNavigation;
            Assert.Equal(2, commentsForTwelve.Count);
            // 14th comment attached to 12th
            var fourteen = commentsForTwelve.ElementAt(1);
            Assert.IsType<ReturnCommentsDto>(fourteen);
            Assert.Equal(14, fourteen.Id);
            // because it has an attached 15th comment to 14th
            Assert.Single(fourteen.InverseCommentNavigation);
        }

        [Fact]
        public async void GET_Comments_For_Existent_BlogPost_Id_Page4_Non_Existent()
        {
            // Arrange
            PersonalWebsiteDevelopmentDbContext context = await GetDatabaseContext();
            CommentsController controller = new CommentsController(context, _logger, _mapper);

            // Act
            int blogId = 3;
            int page = 4;
            int size = 5;
            ActionResult<PaginateCommentsDto> response = await controller.GetComments(blogId, size, page);

            // Assert
            BadRequestObjectResult result = Assert.IsType<BadRequestObjectResult>(response.Result);
            Assert.Equal("Out of range page and/or size parameters.", result.Value);
        }

        [Fact]
        public async void GET_Comments_For_Existent_BlogPost_Id_Invalid_Params()
        {
            // Arrange
            PersonalWebsiteDevelopmentDbContext context = await GetDatabaseContext();
            CommentsController controller = new CommentsController(context, _logger, _mapper);

            // Act
            int blogId = 3;
            ActionResult<PaginateCommentsDto> response = await controller.GetComments(blogId, -1, 3);

            // Assert
            BadRequestObjectResult result = Assert.IsType<BadRequestObjectResult>(response.Result);
            Assert.Equal("Invalid size and/or page params should be size >= 1 and page >= 1.", result.Value);
        }

        [Fact]
        public async void GET_Comments_For_NonExistent_BlogPost_Id()
        {
            // Arrange
            PersonalWebsiteDevelopmentDbContext context = await GetDatabaseContext();
            CommentsController controller = new CommentsController(context, _logger, _mapper);

            // Act
            int id = 555;
            ActionResult<PaginateCommentsDto> response = await controller.GetComments(id);
            BlogPost? model = await context.BlogPosts.FindAsync(id);
            // Assert
            Assert.Null(model);
            BadRequestObjectResult result = Assert.IsType<BadRequestObjectResult>(response.Result);
            Assert.Equal("Blog Post doesn't exist.", result.Value);
        }

        // PUT METHOD

        [Fact]
        public async void PUT_Comment_With_Valid_Id_And_Valid_Value()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CommentsController(context, _logger, _mapper);

            // Act
            int modelId = 5;
            var updateModel = new UpdateCommentDto
            {
                Id = modelId,
                Comment1 = "COMMENT123",
                Name = "Ulgamon"
            };

            var response = await controller.PutComment(modelId, updateModel);
            var updatedModel = await context.Comments.FindAsync(modelId);
            // Assert

            OkObjectResult result = Assert.IsType<OkObjectResult>(response);
            Assert.Equal("Comment successfully changed.", result.Value);
            Assert.NotNull(updatedModel);
            Assert.Equal(updateModel.Id, updatedModel.Id);
            Assert.Equal(updateModel.Comment1, updatedModel.Comment1);
            Assert.Equal(updateModel.Name, updatedModel.Name);
        }

        [Fact]
        public async void PUT_Comment_With_Invalid_Id_And_Invalid_Value()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CommentsController(context, _logger, _mapper);

            // Act
            int modelId = 500;
            var updateModel = new UpdateCommentDto
            {
                Id = modelId,
                Comment1 = "COMMENT1",
                Name = "Ulgamon"
            };

            var response = await controller.PutComment(modelId, updateModel);
            var updatedModel = await context.Comments.FindAsync(modelId);
            // Assert
            Assert.Null(updatedModel);
            BadRequestObjectResult result = Assert.IsType<BadRequestObjectResult>(response);
            Assert.Equal("Comment that you are trying to change doesn't exist.", result.Value);
        }

        [Fact]
        public async void PUT_Comment_With_Invalid_Id_And_Valid_Value()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CommentsController(context, _logger, _mapper);

            // Act
            int id = 3;
            int modelId = 5;
            var updateModel = new UpdateCommentDto
            {
                Id = modelId,
                Comment1 = "COMMENT1",
                Name = "Ulgamon"
            };

            var response = await controller.PutComment(id, updateModel);
            // Assert
            BadRequestObjectResult result = Assert.IsType<BadRequestObjectResult>(response);
            Assert.Equal("Id parameters aren't mathing.", result.Value);
        }

        [Fact]
        public async void POST_Comment_On_BlogPost_With_Valid_Values()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CommentsController(context, _logger, _mapper);

            // Act
            int blogPostId = 3;
            CreateCommentDto createComment = new CreateCommentDto
            {
                Comment1 = "SOMETHINGSOMETHING",
                Email = "gmail@gmail.com",
                Name = "Gmail",
                BlogPostId = blogPostId,
            };
            var response = await controller.PostComment(createComment);
            var blogPostComments = context.Comments
                .Where(e => e.BlogPostId == blogPostId)
                .ToList();
            var createdComment = blogPostComments
                .Where(e => e.Comment1 == createComment.Comment1)
                .FirstOrDefault();

            // Assert
            OkObjectResult result = Assert.IsType<OkObjectResult>(response);
            Assert.Equal("Comment is posted.", result.Value);
            Assert.NotNull(blogPostComments);
            Assert.NotNull(createdComment);
            Assert.Equal(12, blogPostComments.Count);
        }

        [Fact]
        public async void POST_Comment_On_Comment_With_Valid_Values()
        {
            // Arrange
            var context = await GetDatabaseContext();
            var controller = new CommentsController(context, _logger, _mapper);

            // Act
            int commentId = 12;
            CreateCommentDto createComment = new CreateCommentDto
            {
                Comment1 = "SOMETHINGSOMETHING",
                Email = "gmail@gmail.com",
                Name = "Gmail",
                CommentId = commentId,
            };
            var response = await controller.PostComment(createComment);
            var commentsComments = context.Comments
                .Where(e => e.CommentId == commentId)
                .ToList();
            var createdComment = commentsComments
                .Where(e => e.Comment1 == createComment.Comment1)
                .FirstOrDefault();
            // Assert
            OkObjectResult result = Assert.IsType<OkObjectResult>(response);
            Assert.Equal("Comment is posted.", result.Value);
            Assert.NotNull(commentsComments);
            Assert.NotNull(createdComment);
            Assert.Equal(3, commentsComments.Count);
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
            var response = await controller.PostComment(createComment);
            var createdComment = context.Comments
                .Where(e => e.Comment1 == createComment.Comment1)
                .FirstOrDefault();
            // Assert

            Assert.Null(createdComment);
            BadRequestObjectResult result = Assert.IsType<BadRequestObjectResult>(response);
            Assert.Equal("Invalid CommentId and/or BlogPostId.", result.Value);
        }

        [Fact]
        public async void POST_Comment_With_Invalid_ForeignKeys_Both()
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
                BlogPostId = 3,
                CommentId = 3
            };
            var response = await controller.PostComment(createComment);
            var createdComment = context.Comments
                .Where(e => e.Comment1 == createComment.Comment1)
                .FirstOrDefault();
            // Assert

            Assert.Null(createdComment);
            BadRequestObjectResult result = Assert.IsType<BadRequestObjectResult>(response);
            Assert.Equal("Invalid CommentId and/or BlogPostId.", result.Value);
        }

        [Fact]
        public async void POST_Comment_With_Invalid_BlogPost_Id()
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
                BlogPostId = 33333,
            };
            var response = await controller.PostComment(createComment);
            var createdComment = context.Comments
                .Where(e => e.Comment1 == createComment.Comment1)
                .FirstOrDefault();
            // Assert

            Assert.Null(createdComment);
            BadRequestObjectResult result = Assert.IsType<BadRequestObjectResult>(response);
            Assert.Equal("Invalid CommentId and/or BlogPostId.", result.Value);
        }

        [Fact]
        public async void POST_Comment_With_Invalid_Comment_Id()
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
                CommentId = 33333,
            };
            var response = await controller.PostComment(createComment);
            var createdComment = context.Comments
                .Where(e => e.Comment1 == createComment.Comment1)
                .FirstOrDefault();
            // Assert

            Assert.Null(createdComment);
            BadRequestObjectResult result = Assert.IsType<BadRequestObjectResult>(response);
            Assert.Equal("Invalid CommentId and/or BlogPostId.", result.Value);
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
            OkObjectResult result = Assert.IsType<OkObjectResult>(response);
            Assert.Equal($"Comment with id:{id} deleted successfully.", result.Value); 
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
            OkObjectResult result = Assert.IsType<OkObjectResult>(response);
            Assert.Equal($"Comment with id:{id} deleted successfully.", result.Value);
            Assert.Null(deletedComment);
            Assert.Null(attachedToDeleted);
            Assert.Null(attachedToDeleted.CommentId);
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
            BadRequestObjectResult result = Assert.IsType<BadRequestObjectResult>(response);
            Assert.Equal("Non existing comment.", result.Value);
            Assert.Null(deletedComment);
        }
    }
}
