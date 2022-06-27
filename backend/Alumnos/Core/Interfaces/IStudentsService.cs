using Alumnos.Core.Models.DTOs;
using Alumnos.Core.Models.Response;

namespace Alumnos.Core.Interfaces
{
    public interface IStudentsService
    {
        Task<Result> GetAll();
        Task<Result> GetById(int id);
        Task<Result> Insert(StudentDtoForRegister dto);
        Task<Result> Update(int id, StudentDtoForRegister dto);
        Task<Result> Delete(int id);
        Task<Result> GetByFileNumber(int fileNumber);
        Task<Result> GetByDni(string dni);
    }
}
