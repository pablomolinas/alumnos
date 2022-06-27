using Alumnos.Core.Models.DTOs;
using FluentValidation;

namespace Alumnos.Core.Validators
{
    public class StudentValidator : AbstractValidator<StudentDtoForRegister>
    {
        public StudentValidator()
        {            
            RuleFor(x => x.Name).NotEmpty()
                .Matches("^[A-Za-z][A-Za-z0-9 ñÑ]{1,119}$")    
                .Length(2, 120);
            
            RuleFor(x => x.Age).InclusiveBetween(1, 130);
            
            RuleFor(x => x.Dni)                
                .Matches("^[0-9]{8}$").WithMessage("Dni debe tener exactamente 8 digitos decimales.");
            
            RuleFor(x => x.FileNumber).NotEmpty();
            
            RuleFor(x => x.Address).NotEmpty()
                    .MaximumLength(255);
            
            RuleFor(x => x.FileNumber).NotEmpty();           
        }
    }
}
