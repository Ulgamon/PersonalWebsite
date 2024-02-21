using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace PersonalWebsite.API.Data;

public partial class PersonalWebsiteDevelopmentDbContext : IdentityDbContext<ApplicationUser>
{
    public PersonalWebsiteDevelopmentDbContext()
    {
    }

    public PersonalWebsiteDevelopmentDbContext(DbContextOptions<PersonalWebsiteDevelopmentDbContext> options)
        : base(options)
    {
    }

    public DbSet<BlogPost> BlogPosts { get; set; }

    public DbSet<Category> Categories { get; set; }

    public DbSet<Comment> Comments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<BlogPost>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__BlogPost__3214EC075FEB897D");

            entity.Property(e => e.Id).ValueGeneratedOnAdd();
            entity.Property(e => e.BlogMdText).HasColumnType("text");
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.ImgUrl).HasMaxLength(250);
            entity.Property(e => e.Title).HasMaxLength(50);
            entity.Property(e => e.UpdatedDate).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.UserId).HasMaxLength(450);

            entity.HasOne(d => d.User).WithMany(p => p.BlogPosts)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BlogPosts_To_AspNetUser");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Categori__3214EC071E8F58BC");

            entity.Property(e => e.Id).ValueGeneratedOnAdd();
            entity.Property(e => e.CategoryName).HasMaxLength(50);
            entity.Property(e => e.Description).HasMaxLength(500);

            entity.HasMany(d => d.BlogPosts).WithMany(p => p.Categories)
                .UsingEntity<Dictionary<string, object>>(
                    "BlogsCategory",
                    r => r.HasOne<BlogPost>().WithMany()
                        .HasForeignKey("BlogPostId")
                        .HasConstraintName("FK_BlogPostId_ToBlogPosts"),
                    l => l.HasOne<Category>().WithMany()
                        .HasForeignKey("CategoryId")
                        .HasConstraintName("FK_CategoryId_To_Categories"),
                    j =>
                    {
                        j.HasKey("CategoryId", "BlogPostId").HasName("PK__BlogsCat__9A284E1D78AF3402");
                        j.ToTable("BlogsCategories");
                    });
        });

        // Add Roles
        modelBuilder.Entity<IdentityRole>().HasData(
            new IdentityRole
            {
                Name = "User",
                NormalizedName = "USER",
                Id = "f2a04be0-60e2-4835-b0ea-4ac09e8449c5"
            },
            new IdentityRole
            {
                Name = "Administrator",
                NormalizedName = "ADMINISTRATOR",
                Id = "5424f84e-ebad-491f-bf86-96903dbaf476"
            }
        );

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Comments__3214EC0708EEAC55");

            entity.Property(e => e.Id).ValueGeneratedOnAdd();
            entity.Property(e => e.Comment1)
                .HasMaxLength(500)
                .HasColumnName("Comment");
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Name).HasMaxLength(100);

            entity.HasOne(d => d.BlogPost).WithMany(p => p.Comments)
                .HasForeignKey(d => d.BlogPostId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Comment_To_BlogPost");

            entity.HasOne(d => d.CommentNavigation).WithMany(p => p.InverseCommentNavigation)
                .HasForeignKey(d => d.CommentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Comment_To_Comment");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
