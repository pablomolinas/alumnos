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
                Name = dto.Name
            };
            /*
            var ss = new List<StudentSubject>();
            if (dto.Subjects != null)
            {
                foreach (var d in dto.Subjects)
                {
                    ss.Add(new StudentSubject() { Subject = d });
                }
            }
            student.StudentsSubjects = ss;*/
            
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
