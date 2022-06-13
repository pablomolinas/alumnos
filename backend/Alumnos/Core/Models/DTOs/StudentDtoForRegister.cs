using System.ComponentModel.DataAnnotations;

namespace Alumnos.Core.Models.DTOs
{
    public class StudentDtoForRegister
    {
        public string Name { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Please enter a value bigger than {1}")]
        public int Age { get; set; }

        public virtual ICollection<Subject> Subjects { get; set; }
    }
}
