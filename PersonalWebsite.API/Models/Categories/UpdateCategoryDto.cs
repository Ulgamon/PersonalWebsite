﻿using System.ComponentModel.DataAnnotations;

namespace PersonalWebsite.API.Models.Categories
{
    public class UpdateCategoryDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(50, ErrorMessage = "Cannot enter more than 50 characters.")]
        [MinLength(3, ErrorMessage = "Cannot enter less than 3 characters.")]
        public string CategoryName { get; set; } = null!;

        [Required]
        [MaxLength(500, ErrorMessage = "Cannot enter more than 500 characters.")]
        [MinLength(3, ErrorMessage = "Cannot enter less than 3 characters.")]
        public string Description { get; set; } = null!;

        public void Trim()
        {
            CategoryName = CategoryName.Trim();
            Description = Description.Trim();
        }
    }
}
