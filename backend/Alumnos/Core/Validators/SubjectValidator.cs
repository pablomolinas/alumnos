using Alumnos.Core.Models.DTOs;
using FluentValidation;

namespace Alumnos.Core.Validators
{
    public class SubjectValidator : AbstractValidator<SubjectDtoForRegister>
    {

        public SubjectValidator() { 
            
            RuleFor(x => x.Name)
                    .Matches("^[A-Za-z][A-Za-z0-9 #/$.,+\\-*()ñÑ]{1,119}$")                   
                    .Length(2, 120);
            
            RuleFor(x => x.Start).NotEmpty();
            
            RuleFor(x => x.End)
                .NotEmpty()
                .GreaterThan(s => s.Start);
            
            RuleFor(x => x.MaxStudents)                
                .NotEmpty()
                .InclusiveBetween(1, 300);
        }        
    }
}
