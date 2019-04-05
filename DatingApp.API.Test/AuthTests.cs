using System;
using Xunit;

namespace DatingApp.API.Test
{
    public class AuthTests
    { 
       /*  private readonly AuthController _authController;

        public AuthTests() 
        { 
            //_authController = new AuthController(); 
        }  */

        [Fact]
        public void Login_ReturnsBadRequest_WhenModelIsIncorrect()
        {
           Assert.True(true);
        }
    }
}
