using Autofac.Extras.Moq;
using AutoMapper;
using DatingApp.API.Controllers;
using DatingApp.API.Data;
using DatingApp.API.DatingApp;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Moq;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using static DatingApp.API.Test.Common.JsonWrappers;

namespace DatingApp.API.Test
{
    public class AuthControllerTests : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly HttpClient _client;

        public AuthControllerTests(CustomWebApplicationFactory<Startup> factory)
        {
            _client = factory.CreateClient();
        }


        [Fact]
        public async Task Login_ReturnsOKRequest_WhenModelIsValid()
        {
            var user = new UserForLoginDto
            {
                UserName = "Lola",
                Password = "password",
                MfaCode = ""
            };

            var tfa = new TwoFactorAuthNet.TwoFactorAuth();
            user.MfaCode = tfa.GetCode(Base32.Encode(Encoding.UTF8.GetBytes(user.UserName)));


            var myContent = JsonConvert.SerializeObject(user);
            var buffer = System.Text.Encoding.UTF8.GetBytes(myContent);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var httpResponse = await _client.PostAsync("/api/auth/login", byteContent);
            // Must be successful.
            httpResponse.EnsureSuccessStatusCode();

            // Deserialize and examine results.
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            var responseContent = JsonConvert.DeserializeObject<LoginWrapper>(stringResponse);
            Assert.IsType<UserForListDto>(responseContent.user);
        }

        [Fact]
        public async Task Login_ReturnsMFAcodeError_WhenMfaCodeIsInvalid()
        {
            var user = new UserForLoginDto
            {
                UserName = "Lola",
                Password = "password",
                MfaCode = "111111"
            };

            var myContent = JsonConvert.SerializeObject(user);
            var buffer = System.Text.Encoding.UTF8.GetBytes(myContent);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var httpResponse = await _client.PostAsync("/api/auth/login", byteContent);
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            Assert.Equal("MFA code is invalid", stringResponse);
        }
    }

}
