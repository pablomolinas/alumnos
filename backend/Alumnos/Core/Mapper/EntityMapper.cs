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
                Age = dto.Age,
                Dni = dto.Dni,
                FileNumber = dto.FileNumber,
                Address = dto.Address,
            };
            
            
            return student;
        }

        public Subject SubjectDtoForRegisterToSubject(SubjectDtoForRegister dto)
        {
            return new Subject
                {
                    Name = dto.Name,
                    Start = dto.Start.TimeOfDay,
                    End = dto.End.TimeOfDay,
                    MaxStudents = dto.MaxStudents
                };            
        }

        public SubjectDtoForDisplay SubjectToSubjectDtoForDisplay(Subject subject)
        {
            return new SubjectDtoForDisplay
            {
                Id = subject.Id,
                Name = subject.Name,
                Start = subject.Start,
                End = subject.End,
                MaxStudents = subject.MaxStudents,
                TotalStudents = subject.StudentsSubjects.Count,
            };
        }

        public StudentDtoForDisplay StudentToStudentDtoForDisplay(Student student)
        {
            var dto = new StudentDtoForDisplay
            {
                Id = student.Id,
                Name = student.Name,
                Age = student.Age,
                Dni = student.Dni,
                FileNumber = student.FileNumber,
                Address = student.Address,
            };

            var subjects = new List<SubjectDtoForDisplay>();
            foreach(var s in student.StudentsSubjects)
            {
                subjects.Add(this.SubjectToSubjectDtoForDisplay(s.Subject));
            }

            dto.Subjects = subjects;

            return dto;
        }
    }
}
