using Alumnos.Core.Models;
using Alumnos.Core.Models.DTOs;

namespace Alumnos.Core.Interfaces
{
    public interface IEntityMapper
    {
        Student StudentDtoForRegisterToStudent(StudentDtoForRegister dto);
        Subject SubjectDtoForRegisterToSubject(SubjectDtoForRegister dto);
        StudentDtoForDisplay StudentToStudentDtoForDisplay(Student student);
        SubjectDtoForDisplay SubjectToSubjectDtoForDisplay(Subject subject);
    }
}
