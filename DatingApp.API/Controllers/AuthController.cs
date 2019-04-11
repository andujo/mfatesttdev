using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DatingApp.API.Controllers
{
    /// <summary>
    /// API Authorization Controller
    /// </summary>
    [Produces("application/json")]
    [Consumes("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        /// <summary>
        /// Controller Constructor
        /// </summary>
        /// <param name="repo"></param>
        /// <param name="config"></param>
        /// <param name="mapper"></param>
        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            _mapper = mapper;
            _config = config;
            _repo = repo;
        }

        /// <summary>
        /// Register new members
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Register
        ///     {
        ///         "userName": "string",
        ///         "password": "string",
        ///         "gender": "string",
        ///          "knownAs": "string",
        ///         "dateOfBirth": "2019-04-11T14:31:04.944Z",
        ///         "city": "string",
        ///         "country": "string"
        ///     }
        ///
        /// </remarks>
        /// <param name="userForRegisterDto"></param>
        /// <returns>A newly created user</returns>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>            
        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register([FromBody]UserForRegisterDto userForRegisterDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            userForRegisterDto.UserName = userForRegisterDto.UserName.ToLower();
            if (await _repo.UserExists(userForRegisterDto.UserName))
                return BadRequest("UserName already taken");

            var userToCreate = _mapper.Map<User>(userForRegisterDto);

            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

            var userToReturn = _mapper.Map<UserForDetailedDto>(createdUser);
            return CreatedAtRoute("GetUser", new { controller = "Users", id = createdUser.Id },
            userToReturn);
        }

        /// <summary>
        /// Login Method
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Login
        ///     {
        ///         "userName": "string",
        ///         "password": "string",
        ///         "mfaCode": "string",
        ///     }
        ///
        /// </remarks>
        /// <param name="userForLoginDto"></param>
        /// <returns>A User and its JWT token</returns>
        /// <response code="200">The User and its JWT token</response>
        /// <response code="400">If the model is invalid or the mfa code is wrong</response> 
        /// <response code="401">If the user does not exist</response>    
        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Login([FromBody]UserForLoginDto userForLoginDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (VerifyMFACode(userForLoginDto.UserName, userForLoginDto.MfaCode))
            {
                var userFromRepo = await _repo.Login(userForLoginDto.UserName.ToLower(), userForLoginDto.Password);
                if (userFromRepo == null)
                    return Unauthorized();

                //build token, it will contains user name
                var claims = new[]
                {
                        new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                        new Claim(ClaimTypes.Name, userFromRepo.UserName)
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.Now.AddDays(1),
                    SigningCredentials = creds
                };

                var tokenHandler = new JwtSecurityTokenHandler();

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var user = _mapper.Map<UserForListDto>(userFromRepo);

                return Ok(new
                {
                    token = tokenHandler.WriteToken(token),
                    user
                });
            }
            else
                return BadRequest("MFA code is invalid");
        }

        private bool VerifyMFACode(string userName, string mfaCode)
        {
            var tfa = new TwoFactorAuthNet.TwoFactorAuth();
            return tfa.VerifyCode(Base32.Encode(Encoding.UTF8.GetBytes(userName)), mfaCode);
        }
    }
}