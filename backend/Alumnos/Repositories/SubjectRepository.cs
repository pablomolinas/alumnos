using Alumnos.Core.Models;
using Alumnos.Core.Models.DTOs;
using Alumnos.DataContext;
using Alumnos.Repositories.Interfaces;
using System.Linq.Expressions;

namespace Alumnos.Repositories
{
    public class SubjectRepository : GenericRepository<Subject, AppDbContext>, ISubjectRepository
    {
        public SubjectRepository(AppDbContext _dbContext) : base(_dbContext)
        {

        }

        public async Task<ICollection<SubjectDtoForDisplay>> GetAllWithTotalStudents()
        {
            return (ICollection<SubjectDtoForDisplay>)this._dbContext.Subjects
                    .Join(this._dbContext.StudentsSubjects, 
                            subject => subject.Id, 
                            ss => ss.SubjectId,
                            (subject, ss) =>                                 
                                new SubjectDtoForDisplay
                                {
                                    Id = subject.Id,
                                    Name = subject.Name
                                }
                            ).ToList();
        }        

    }
}
