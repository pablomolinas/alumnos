namespace Alumnos.Core.Models.DTOs
{
    public class SubjectDtoForDisplay
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public TimeSpan Start { get; set; }
        public TimeSpan End { get; set; }
        public int MaxStudents { get; set; }
        public int TotalStudents { get; set; }        
    }
}
