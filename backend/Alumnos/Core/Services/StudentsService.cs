using Alumnos.Core.Interfaces;
using Alumnos.Core.Models;
using Alumnos.Core.Models.DTOs;
using Alumnos.Core.Models.Response;
using Alumnos.Repositories.Interfaces;

namespace Alumnos.Core.Services
{
    public class StudentsService : IStudentsService
    {
        private readonly IUnitOfWork _uow;
        private readonly IEntityMapper _entityMapper;
        private readonly IStudentsSubjectsService _studentsSubjectsService;
        public StudentsService(IUnitOfWork uow, IEntityMapper mapper, IStudentsSubjectsService studentsSubjects)
        {
            _uow = uow;
            _entityMapper = mapper;
            _studentsSubjectsService = studentsSubjects;
        }

        public async Task<Result> GetAll()
        {
            try
            {
                var students = await _uow.StudentsRepository.FindAllAsync();
                if (students.Count > 0)
                {
                    var dtoList = new List<StudentDtoForDisplay>();
                    foreach (var p in students)
                    {
                        dtoList.Add(_entityMapper.StudentToStudentDtoForDisplay(p));
                    }

                    return Result<ICollection<StudentDtoForDisplay>>.SuccessResult(dtoList);                    
                }

                return Result.FailureResult("No hay Resultados", 404);
            }
            catch (Exception ex)
            {
                return Result.ErrorResult(new List<string> { ex.Message });
            }
        }

        public async Task<Result> GetById(int id)
        {
            try
            {
                var student = await _uow.StudentsRepository.GetByIdAsync(id);
                if (student != null)
                {
                    return Result<StudentDtoForDisplay>.SuccessResult(_entityMapper.StudentToStudentDtoForDisplay(student));
                }

                return Result.FailureResult("Alumno inexistente", 404);
            }
            catch (Exception ex)
            {
                return Result.ErrorResult(new List<string> { ex.Message });
            }
        }

        public async Task<Result> GetByFileNumber(int fileNumber)
        {
            try
            {
                var r = await _uow.StudentsRepository.FindByConditionAsync(x => x.FileNumber == fileNumber);
                if (r.Count > 0)
                {
                    return Result<StudentDtoForDisplay>.SuccessResult(_entityMapper.StudentToStudentDtoForDisplay(r.First()));
                }

                return Result.FailureResult("Legajo de alumno inexistente", 404);
            }
            catch (Exception ex)
            {
                return Result.ErrorResult(new List<string> { ex.Message });
            }
        }

        public async Task<Result> GetByDni(string dni)
        {
            try
            {
                var r = await _uow.StudentsRepository.FindByConditionAsync(x => x.Dni == dni);
                if (r.Count > 0)
                {
                    return Result<StudentDtoForDisplay>.SuccessResult(_entityMapper.StudentToStudentDtoForDisplay(r.First()));
                }

                return Result.FailureResult("Dni de alumno inexistente", 404);
            }
            catch (Exception ex)
            {
                return Result.ErrorResult(new List<string> { ex.Message });
            }
        }

        public async Task<Result> Insert(StudentDtoForRegister dto)
        {
            try
            {
                var r = await _uow.StudentsRepository.FindByConditionAsync(x => x.Dni == dto.Dni || x.FileNumber == dto.FileNumber);
                if (r.Count > 0)
                {
                    return Result.FailureResult("El Alumno ya existe en el sistema");
                }

                var student = _entityMapper.StudentDtoForRegisterToStudent(dto);

                await _uow.StudentsRepository.CreateAsync(student);
                await _uow.SaveChangesAsync();

                // create subjects
                await _studentsSubjectsService.InsertRange(student.Id, dto.Subjects);


                return Result<int>.SuccessResult(student.Id);
            }
            catch (Exception ex)
            {
                return Result.ErrorResult(new List<string> { ex.Message });
            }
        }

        public async Task<Result> Update(int id, StudentDtoForRegister dto)
        {
            try
            {
                var student = await _uow.StudentsRepository.GetByIdAsync(id);
                if (student != null)
                {
                    student.Name = dto.Name;
                    student.Age = dto.Age;
                    student.Dni = dto.Dni;
                    student.FileNumber = dto.FileNumber;
                    student.Address = dto.Address;

                    await _uow.SaveChangesAsync();

                    await _studentsSubjectsService.DeleteRange(student.Id);
                    await _studentsSubjectsService.InsertRange(student.Id, dto.Subjects);

                    return Result<int>.SuccessResult(student.Id);
                }

                return Result.FailureResult("Alumno inexistente", 404);
            }
            catch (Exception ex)
            {
                return Result.ErrorResult(new List<string> { ex.Message });
            }
        }

        /// <summary>
        ///     Logic Delete
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Result> Delete(int id)
        {
            try
            {
                var student = await _uow.StudentsRepository.GetByIdAsync(id);
                if (student != null)
                {
                    await _studentsSubjectsService.DeleteRange(id);
                    _uow.StudentsRepository.Remove(student);
                    await _uow.SaveChangesAsync();
                    return Result<int>.SuccessResult(id);
                }

                return Result.FailureResult("Alumno inexistente", 404);
            }
            catch (Exception ex)
            {
                return Result.ErrorResult(new List<string> { ex.Message });
            }
        }
    }
}
