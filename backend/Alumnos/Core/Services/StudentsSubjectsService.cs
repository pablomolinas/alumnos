using Alumnos.Core.Interfaces;
using Alumnos.Core.Models;
using Alumnos.Core.Models.Response;
using Alumnos.Repositories.Interfaces;

namespace Alumnos.Core.Services
{
    public class StudentsSubjectsService : IStudentsSubjectsService 
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IEntityMapper _entityMapper;
        public StudentsSubjectsService(IUnitOfWork unitOfWork, IEntityMapper entityMapper)
        {
            _unitOfWork = unitOfWork;
            _entityMapper = entityMapper;
        }

        public async Task<ICollection<StudentSubject>> GetAllById(int studentId)
        {

            var ss = await _unitOfWork.StudentsSubjectsRepository.FindByConditionAsync(x => x.StudentId == studentId);
            return ss;
        }

        public async Task<Result> Insert(int StudentId, int SubjectId)
        {
            try
            {
                return Result.SuccessResult();
            }
            catch (Exception ex)
            {
                return Result.ErrorResult(new List<string> { ex.Message });
            }
        }

        public async Task<Result> InsertRange(int studentId, ICollection<Subject> subjects)
        {
            try
            {
                var d = new List<StudentSubject>();
                foreach (var x in subjects)
                {
                    d.Add(new StudentSubject() { StudentId = studentId, SubjectId = x.Id });
                }

                await _unitOfWork.StudentsSubjectsRepository.CreateRangeAsync(d);
                await _unitOfWork.SaveChangesAsync();

                return Result.SuccessResult();
            }
            catch (Exception ex)
            {
                return Result.ErrorResult(new List<string> { ex.Message });
            }
        }

        public async Task DeleteRange(int studentId)
        {
            var ss = await GetAllById(studentId);
            if (ss.Count > 0)
            {
                _unitOfWork.StudentsSubjectsRepository.RemoveRange(ss);
                await _unitOfWork.SaveChangesAsync();
            }
        }
    }
}
