using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PersonalWebsite.API.Models.ImageUpload;
using System.Net.Mime;

namespace PersonalWebsite.API.Controllers
{
    // CONTROLLER USED FOR IMAGE UPLOADING
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<UploadController> _logger;

        public UploadController(IConfiguration configuration, ILogger<UploadController> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }


        [HttpPost]
        [Route("Image")]
        [Authorize]
        public async Task<ActionResult<ImageUploadResponseDto>> PostImage(IFormFile formFile)
        {

            string formFileName =  Guid.NewGuid().ToString();
            // Using FileInfo class to get extension from image file
            FileInfo fileInfo = new FileInfo(formFile.FileName);

            // So expectaion here is that I'll have this unique datetime string together with file extension
            formFileName += fileInfo.Extension;

            if (formFile.ContentType != MediaTypeNames.Image.Jpeg && formFile.ContentType != MediaTypeNames.Image.Gif && formFile.ContentType != MediaTypeNames.Image.Png)
            {
                _logger.LogWarning($"File that you want to upload: {formFile.FileName} is not of type (jpg, png, gif).");
                return BadRequest();
            }

            var response = new ImageUploadResponseDto();

            // setting the full Url for the object
            response.FileUrl = _configuration["StaticHost"] + "/" + formFileName;
            string? bucketName = _configuration["S3BucketName"];

            // Adding AWS Credentials

            IAmazonS3 client = new AmazonS3Client();

            // Create memory stream
            using var memoryStream = new MemoryStream();
            await formFile.CopyToAsync(memoryStream);

            if (await UploadFileAsync(client, bucketName, formFileName, memoryStream))
            {
                response.ResponseCode = 200;
                return Ok(response);
            }
            return BadRequest();

        }

        private async Task<bool> UploadFileAsync(IAmazonS3 client, string bucketName, string keyName, MemoryStream memoryStream)
        {
            var request = new PutObjectRequest
            {
                InputStream = memoryStream,
                BucketName = bucketName,
                Key = keyName,

            };

            var response = await client.PutObjectAsync(request);
            if (response.HttpStatusCode == System.Net.HttpStatusCode.OK)
            {
                _logger.LogInformation($"Successful upload to the bucket: {bucketName}, filename: {keyName}");
                return true;
            }
            else
            {
                _logger.LogError($"Unsuccessful upload to the bucket: {bucketName}, filename: {keyName}");
                return false;
            }
        } 

    }
}
