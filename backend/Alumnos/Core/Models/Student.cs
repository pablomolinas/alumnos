namespace Alumnos.Core.Models
{
    public class Student
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<StudentSubject> StudentsSubjects { get; set; }
    }
}
