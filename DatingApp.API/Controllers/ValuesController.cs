using DatingApp.API.DatingApp;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace DatingApp.API.Controllers
{
    /// <summary>
    /// Values Controller
    /// </summary>
    [Authorize]
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        private readonly DataContext _context;
        /// <summary>
        /// Values Controller Constructor
        /// </summary>
        /// <param name="context"></param>
        public ValuesController(DataContext context)
        {
            _context = context;
        }


        /// <summary>
        /// GetVaues Method
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetVaues()
        {
            var values = await _context.Values.ToListAsync();
            return Ok(values);
        }

        /// <summary>
        /// GetValue Method
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        // GET api/values/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetValue(int id)
        {
            return Ok(await _context.Values.FirstOrDefaultAsync(x => x.Id == id));
        }

        /// <summary>
        /// Post Method
        /// </summary>
        /// <param name="value"></param>
        [HttpPost]
        public void Post([FromBody]string value)
        {
            throw new NotSupportedException();
        }

        /// <summary>
        /// Put Method
        /// </summary>
        /// <param name="id"></param>
        /// <param name="value"></param>
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
            throw new NotSupportedException();
        }

        /// <summary>
        /// Delete Value
        /// </summary>
        /// <param name="id"></param>
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            throw new NotSupportedException();
        }
    }
}
