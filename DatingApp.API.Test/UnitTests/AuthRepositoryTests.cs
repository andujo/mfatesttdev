using DatingApp.API.Data;
using DatingApp.API.DatingApp;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;
using Moq;
using System.Threading.Tasks;
using Xunit;

namespace DatingApp.API.Test
{
    public class AuthRepositoryTests
    {
        public readonly DataContext _dataContext = null;

        public AuthRepositoryTests()
        {
            var optionsBuilder = new DbContextOptionsBuilder<DataContext>().UseInMemoryDatabase("InMemoryAppDb");
            _dataContext = new DataContext(optionsBuilder.Options);
            SeedData.PopulateTestData(_dataContext);
        }

        #region Login Method
        [Theory]
        [InlineData("", "")]
        [InlineData("tiempo", "")]
        [InlineData("tiempo", "password")]
        public async Task Login_ReturnsBadRequest_WhenUserOrPasswordInvalid(string userName, string password)
        {
            var controller = new AuthRepository(_dataContext);
            // Act
            var result = await controller.Login(userName, password);

            // Assert
            Assert.Null(result);

        }

        [Fact]
        public async Task Login_ReturnsUser_WhenUserAndPasswordAreValid()
        {
            var authRepo = new AuthRepository(_dataContext);

            var result = await authRepo.Login("lola", "password");

            Assert.IsType<User>(result);
        }

        #endregion Login Method

        #region UserExists Method
        [Theory]
        [InlineData("lola")]
        [InlineData("reba")]
        [InlineData("dorothy")]
        public async Task UserExists_ReturnsTrue_WhenUserIsValid(string userName)
        {
            var authRepo = new AuthRepository(_dataContext);

            var result = await authRepo.UserExists(userName);

            Assert.True(result);
        }

        [Theory]
        [InlineData("Lola")]
        [InlineData("LOLA")]
        [InlineData("LoLA")]
        [InlineData("")]
        [InlineData(null)]
        public async Task UserExists_ReturnsFalse_WhenUserIsInalid(string userName)
        {
            var authRepo = new AuthRepository(_dataContext);

            var result = await authRepo.UserExists(userName);

            Assert.False(result);
        }

        #endregion UserExists Method

        #region Register Method

        [Fact]
        public async Task Register_ReturnsUser_WhenUserIsValid()
        {
            var authRepo = new AuthRepository(_dataContext);

            var user = new User
            {
                UserName = "tiempodev",
                KnownAs = "tiempo",
                City = "Monterrey",
                Country = "Mexico"
            };

            var result = await authRepo.Register(user, "password");

            Assert.IsType<User>(result);
        }

        #endregion Register Method

    }

}
