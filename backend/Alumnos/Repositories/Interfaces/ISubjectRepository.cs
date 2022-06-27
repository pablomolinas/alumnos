using Alumnos.Core.Models;
using Alumnos.Core.Models.DTOs;

namespace Alumnos.Repositories.Interfaces
{
    public interface ISubjectRepository : IGenericRepository<Subject>
    {
        Task<ICollection<SubjectDtoForDisplay>> GetAllWithTotalStudents();
    }
}
