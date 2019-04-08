using AutoMapper;
using DatingApp.API.Controllers;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Moq;
using System.Threading.Tasks;
using Xunit;

namespace DatingApp.API.Test
{
    public class AuthTests
    {
        [Fact]
        public async Task Login_ReturnsBadRequest_WhenModelIsIncorrect()
        {
            var mockRepo = new Mock<IAuthRepository>();
            var mockConfig = new Mock<IConfiguration>();
            var mockMapper = new Mock<IMapper>();

            var controller = new AuthController(mockRepo.Object, mockConfig.Object, mockMapper.Object);
            controller.ModelState.AddModelError("Test", "Test Model Error");
            // Act
            var result = await controller.Login(null);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);

        }

        [Fact]
        public async Task Login_ReturnsBadRequest_WhenMfaCodeIsInvalid()
        {
            var mockRepo = new Mock<IAuthRepository>();
            var mockConfig = new Mock<IConfiguration>();
            var mockMapper = new Mock<IMapper>();

            var controller = new AuthController(mockRepo.Object, mockConfig.Object, mockMapper.Object);
            var user = new UserForLoginDto
            {
                UserName = "TestName",
                Password = "TestPassword",
                MfaCode = ""
            };
            // Act
            var result = await controller.Login(user);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);

        }
    }
}
