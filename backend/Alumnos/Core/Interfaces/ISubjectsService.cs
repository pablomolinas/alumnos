using Alumnos.Core.Models.DTOs;
using Alumnos.Core.Models.Response;

namespace Alumnos.Core.Interfaces
{
    public interface ISubjectsService
    {
        Task<Result> GetAll();
        Task<Result> GetById(int id);
        Task<Result> Insert(SubjectDtoForRegister dto);
        Task<Result> Update(int id, SubjectDtoForRegister dto);
        Task<Result> Delete(int id);
    }
}
