using Alumnos.Core.Interfaces;
using Alumnos.Core.Models;
using Alumnos.Core.Models.DTOs;
using Alumnos.Core.Models.Response;
using Alumnos.Repositories.Interfaces;

namespace Alumnos.Core.Services
{
    public class SubjectsService : ISubjectsService
    {
        private readonly IUnitOfWork _uow;
        private readonly IEntityMapper _entityMapper;
        public SubjectsService(IUnitOfWork uow, IEntityMapper mapper)
        {
            _uow = uow;
            _entityMapper = mapper;
        }

        public async Task<Result> GetAll()
        {
            try
            {
                var subjects = await _uow.SubjectsRepository.FindAllAsync();
                if (subjects.Count > 0)
                {
                    return Result<ICollection<Subject>>.SuccessResult(subjects);
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
                var subject = await _uow.SubjectsRepository.GetByIdAsync(id);
                if (subject != null)
                {
                    return Result<Subject>.SuccessResult(subject);
                }

                return Result.FailureResult("Materia inexistente", 404);
            }
            catch (Exception ex)
            {
                return Result.ErrorResult(new List<string> { ex.Message });
            }
        }

        public async Task<Result> Insert(SubjectDtoForRegister dto)
        {
            try
            {
                var r = await _uow.SubjectsRepository.FindByConditionAsync(x => x.Name == dto.Name);
                if (r.Count > 0)
                {
                    return Result.FailureResult("La materia ya existe en el sistema");
                }

                var subject = _entityMapper.SubjectDtoForRegisterToSubject(dto);

                await _uow.SubjectsRepository.CreateAsync(subject);
                await _uow.SaveChangesAsync();
                                
                return Result<int>.SuccessResult(subject.Id);
            }
            catch (Exception ex)
            {
                return Result.ErrorResult(new List<string> { ex.Message });
            }
        }

        public async Task<Result> Update(int id, SubjectDtoForRegister dto)
        {
            try
            {
                var subject = await _uow.SubjectsRepository.GetByIdAsync(id);
                if (subject != null)
                {
                    subject.Name = dto.Name;
                    await _uow.SaveChangesAsync();
                    
                    return Result<int>.SuccessResult(subject.Id);
                }

                return Result.FailureResult("Materia inexistente", 404);
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
                var subject = await _uow.SubjectsRepository.GetByIdAsync(id);
                if (subject != null)
                {
                    //await _studentsSubjectsService.DeleteRange(id);
                    _uow.SubjectsRepository.Remove(subject);
                    await _uow.SaveChangesAsync();
                    return Result<int>.SuccessResult(id);
                }

                return Result.FailureResult("Materia inexistente", 404);
            }
            catch (Exception ex)
            {
                return Result.ErrorResult(new List<string> { ex.Message });
            }
        }
    }
}
