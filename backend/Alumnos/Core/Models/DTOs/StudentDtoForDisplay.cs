namespace Alumnos.Core.Models.DTOs
{
    public class StudentDtoForDisplay
    {
        public int Id { get; set; }
        public string Name { get; set; }
                
        public int Age { get; set; }
        public virtual ICollection<Subject> Subjects { get; set; }
    }
}
