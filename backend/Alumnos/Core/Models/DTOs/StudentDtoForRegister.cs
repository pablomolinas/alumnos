namespace Alumnos.Core.Models.DTOs
{
    public class StudentDtoForRegister
    {
        public string Name { get; set; }

        public virtual ICollection<Subject> Subjects { get; set; }
    }
}
