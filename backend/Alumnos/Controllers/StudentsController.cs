using Alumnos.Core.Interfaces;
using Alumnos.Core.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Alumnos.Controllers
{
    [Route("students")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly IStudentsService _studentsService;
        public StudentsController(IStudentsService studentsService)
        {
            _studentsService = studentsService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _studentsService.GetAll();
            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await _studentsService.GetById(id);
            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("dni/{dni}")]
        public async Task<IActionResult> GetByDni(string dni)
        {
            var result = await _studentsService.GetByDni(dni);
            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("fileNumber/{fileNumber}")]
        public async Task<IActionResult> GetByFileNumber(int fileNumber)
        {
            var result = await _studentsService.GetByFileNumber(fileNumber);
            return StatusCode(result.StatusCode, result);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] StudentDtoForRegister dto)
        {
            var result = await _studentsService.Insert(dto);
            return StatusCode(result.StatusCode, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] StudentDtoForRegister dto)
        {
            var result = await _studentsService.Update(id, dto);
            return StatusCode(result.StatusCode, result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _studentsService.Delete(id);
            return StatusCode(result.StatusCode, result);
        }
    }
}
