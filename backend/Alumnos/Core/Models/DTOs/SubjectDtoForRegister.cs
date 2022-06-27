namespace Alumnos.Core.Models.DTOs
{
    public class SubjectDtoForRegister
    {
        public string Name { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int MaxStudents { get; set; }
    }
}
