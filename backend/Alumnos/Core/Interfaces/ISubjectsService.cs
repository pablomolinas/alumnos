using Alumnos.Core.Models.Response;

namespace Alumnos.Core.Interfaces
{
    public interface ISubjectsService
    {
        Task<Result> GetAll();
    }
}
