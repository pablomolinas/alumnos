using Alumnos.Core.Interfaces;
using Alumnos.Core.Models.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Alumnos.Controllers
{
    [Route("subjects")]
    [ApiController]
    public class SubjectsController : ControllerBase
    {
        private readonly ISubjectsService _subjectsService;
        public SubjectsController(ISubjectsService subjectsService)
        {
            _subjectsService = subjectsService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _subjectsService.GetAll();
            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await _subjectsService.GetById(id);
            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("totalStudents/{subjectId}")]
        public async Task<IActionResult> GetTotalStudentsBySubjectId(int subjectId)
        {
            var result = await _subjectsService.GetTotalStudentsBySubjectId(subjectId);
            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("totalStudents/")]
        public async Task<IActionResult> GetAllTotalStudents()
        {
            var result = await _subjectsService.GetAllTotalStudents();
            return StatusCode(result.StatusCode, result);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SubjectDtoForRegister dto)
        {
            var result = await _subjectsService.Insert(dto);
            return StatusCode(result.StatusCode, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] SubjectDtoForRegister dto)
        {
            var result = await _subjectsService.Update(id, dto);
            return StatusCode(result.StatusCode, result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _subjectsService.Delete(id);
            return StatusCode(result.StatusCode, result);
        }

    }
}
