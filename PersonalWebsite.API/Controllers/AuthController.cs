using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PersonalWebsite.API.Data;
using PersonalWebsite.API.Models.Users;
using System.Text;

namespace PersonalWebsite.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly PersonalWebsiteDevelopmentDbContext _context;
        private readonly ILogger<AuthController> _logger;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        public AuthController(PersonalWebsiteDevelopmentDbContext context, ILogger<AuthController> logger, IMapper mapper, IConfiguration configuration)
        {
            _context = context;
            _logger = logger;
            _mapper = mapper;
            _configuration = configuration;

        }

        //[HttpPost]
        //[Route("login")]
        //public async Task<IActionResult> Login(LoginApplicationUserDto applicationUser)
        //{

        //}

        //private async Task<string> GenerateToken(ApplicationUser user)
        //{
        //    SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]));
        //    var Credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            
        //} 
    }
}
