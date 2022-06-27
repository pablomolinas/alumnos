namespace Alumnos.Core.Models
{
    public class Subject
    {
        public int Id { get; set; }
        public string Name { get; set; }    
        public TimeSpan Start { get; set; } 
        public TimeSpan End { get; set; }
        public int MaxStudents { get; set; }

        public virtual ICollection<StudentSubject> StudentsSubjects { get; set; }
    }
}
