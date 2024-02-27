using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PersonalWebsite.API.Controllers
{
    // CONTROLLER USED FOR IMAGE UPLOADING
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        //private readonly IConfiguration _configuration;

        //public UploadController(IConfiguration configuration)
        //{
        //    _configuration = configuration;
        //}


        //[HttpPost]
        //[Route("Image")]
        //[Authorize]
        //public async Task<ActionResult> PostImage(IFormFile formFile)
        //{
        //    return Ok();
        //}
    }
}
