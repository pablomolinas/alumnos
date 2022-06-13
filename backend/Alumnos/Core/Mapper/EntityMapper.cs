using Alumnos.Core.Interfaces;
using Alumnos.Core.Models;
using Alumnos.Core.Models.DTOs;

namespace Alumnos.Core.Mapper
{
    public class EntityMapper : IEntityMapper
    {
        public Student StudentDtoForRegisterToStudent(StudentDtoForRegister dto)
        {
            var student =  new Student
            {
                Name = dto.Name,
                Age = dto.Age
            };
            
            
            return student;
        }

        public Subject SubjectDtoForRegisterToSubject(SubjectDtoForRegister dto)
        {
            return new Subject
                {
                    Name = dto.Name
                };            
        }

        public StudentDtoForDisplay StudentToStudentDtoForDisplay(Student student)
        {
            var dto = new StudentDtoForDisplay
            {
                Id = student.Id,
                Name = student.Name,
                Age = student.Age
            };

            var subjects = new List<Subject>();
            foreach(var s in student.StudentsSubjects)
            {
                subjects.Add(s.Subject);
            }

            dto.Subjects = subjects;

            return dto;
        }
    }
}
