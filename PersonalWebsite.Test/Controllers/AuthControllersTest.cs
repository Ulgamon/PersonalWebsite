using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using PersonalWebsite.API.Configurations;
using PersonalWebsite.API.Controllers;
using PersonalWebsite.API.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalWebsite.Test.Controllers
{
    public class AuthControllersTest
    {
        private readonly ILogger<BlogPostsController> _logger;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        private async Task<PersonalWebsiteDevelopmentDbContext> GetDatabaseContext()
        {
            var dbOptions = new DbContextOptionsBuilder<PersonalWebsiteDevelopmentDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            PersonalWebsiteDevelopmentDbContext databaseContext = new PersonalWebsiteDevelopmentDbContext(dbOptions);

            await databaseContext.Database.EnsureCreatedAsync();
            try
            {
                // Create Role
                await databaseContext.Roles.AddAsync(new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "USER",
                    Id = "f2a04be0-60e2-4835-b0ea-4ac09e8449c5"
                });
                await databaseContext.Roles.AddAsync(new IdentityRole
                {
                    Name = "Administrator",
                    NormalizedName = "ADMINISTRATOR",
                    Id = "5424f84e-ebad-491f-bf86-96903dbaf476"
                });
                // Create ONE DEFAULT USER FOR INMEMORYDATABASE
                var hasher = new PasswordHasher<ApplicationUser>();
               
                await databaseContext.Users.AddAsync(new ApplicationUser
                {
                    Id = "37ca6d9e-a698-4cc8-8655-9ad6d1670593",
                    Email = "test@gmail.com",
                    NormalizedEmail = "TEST@GMAIL.COM",
                    UserName = "test@gmail.com",
                    PasswordHash = hasher.HashPassword(null, "P@ssword123")
                });
                await databaseContext.SaveChangesAsync();

                await databaseContext.UserRoles.AddAsync(new IdentityUserRole<string>
                {
                    RoleId = "5424f84e-ebad-491f-bf86-96903dbaf476",
                    UserId = "37ca6d9e-a698-4cc8-8655-9ad6d1670593"
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

        public AuthControllersTest()
        {

            // Mock ILogger Interface
            var loggerMock = new Mock<ILogger<BlogPostsController>>();
            _logger = loggerMock.Object;

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
    }
}
