using System.ComponentModel.DataAnnotations;

namespace Alumnos.Core.Models.DTOs
{
    public class StudentDtoForRegister
    {
        public string Name { get; set; }

        //[Range(1, int.MaxValue, ErrorMessage = "Please enter a value bigger than {1}")]
        public int Age { get; set; }

        public string Dni { get; set; }
        public int FileNumber { get; set; }
        public string Address { get; set; }

        public virtual ICollection<SubjectDtoForDisplay> Subjects { get; set; }
    }
}
