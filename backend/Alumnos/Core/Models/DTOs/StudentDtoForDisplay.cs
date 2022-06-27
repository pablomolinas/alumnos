namespace Alumnos.Core.Models.DTOs
{
    public class StudentDtoForDisplay
    {
        public int Id { get; set; }
        public string Name { get; set; }
                
        public int Age { get; set; }
        public string Dni { get; set; }
        public int FileNumber { get; set; }
        public string Address { get; set; }

        public virtual ICollection<SubjectDtoForDisplay> Subjects { get; set; }
    }
}
