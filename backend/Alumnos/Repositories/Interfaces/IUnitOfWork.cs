using Alumnos.Core.Models;

namespace Alumnos.Repositories.Interfaces
{
    public interface IUnitOfWork
    {
        public IGenericRepository<Student> StudentsRepository { get; }
        public IGenericRepository<Subject> SubjectsRepository { get; }
        public IGenericRepository<StudentSubject> StudentsSubjectsRepository { get; }
        
        public void Dispose();
        public void SaveChanges();
        public Task SaveChangesAsync();
    }
}
