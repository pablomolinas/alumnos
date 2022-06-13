using Alumnos.Core.Models;
using Alumnos.Core.Models.Response;

namespace Alumnos.Core.Interfaces
{
    public interface IStudentsSubjectsService
    {
        Task<ICollection<StudentSubject>> GetAllById(int studentId);
        Task<Result> Insert(int StudentId, int SubjectId);
        Task<Result> InsertRange(int studentId, ICollection<Subject> subjects);
        Task DeleteRange(int studentId);
    }
}
