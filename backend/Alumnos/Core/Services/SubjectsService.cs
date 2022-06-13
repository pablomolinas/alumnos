using Alumnos.Core.Interfaces;
using Alumnos.Core.Models;
using Alumnos.Core.Models.Response;
using Alumnos.Repositories.Interfaces;

namespace Alumnos.Core.Services
{
    public class SubjectsService : ISubjectsService
    {
        private readonly IUnitOfWork _uow;
        public SubjectsService(IUnitOfWork uow)
        {
            _uow = uow;
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
    }
}
