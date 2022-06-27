using Alumnos.DataContext;
using Alumnos.Core.Models;
using Alumnos.Repositories.Interfaces;


namespace Alumnos.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        #region Constructor and Context
        private readonly AppDbContext _dbContext;
        public UnitOfWork(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        #endregion

        #region Repositories
        private readonly IGenericRepository<Student> _studentsRepository;
        private readonly ISubjectRepository _subjectsRepository;
        private readonly IGenericRepository<StudentSubject> _studentsSubjectsRepository;
        
        public IGenericRepository<Student> StudentsRepository => _studentsRepository ?? new GenericRepository<Student, AppDbContext>(_dbContext);
        public ISubjectRepository SubjectsRepository => _subjectsRepository ?? new SubjectRepository(_dbContext);
        public IGenericRepository<StudentSubject> StudentsSubjectsRepository => _studentsSubjectsRepository ?? new GenericRepository<StudentSubject, AppDbContext>(_dbContext);
 
        #endregion

        #region Methods
        public void Dispose()
        {
            if (_dbContext != null)
            {
                _dbContext.Dispose();
            }
        }
        public void SaveChanges()
        {
            _dbContext.SaveChanges();
        }
        public async Task SaveChangesAsync()
        {
            await _dbContext.SaveChangesAsync();
        }
        #endregion
    }
}
