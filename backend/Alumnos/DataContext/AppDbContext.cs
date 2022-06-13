using Alumnos.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Alumnos.DataContext
{
    public class AppDbContext : DbContext
    {
        public DbSet<Student> Students { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<StudentSubject> StudentsSubjects { get; set; }
              
        public AppDbContext(DbContextOptions options) : base(options)
        {
            //Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {            
            modelBuilder.Entity<StudentSubject>().HasKey(prop => new { prop.StudentId, prop.SubjectId });

            //this.SeedStudents(modelBuilder);
            //this.SeedSubjects(modelBuilder);
            //this.SeedStudentsSubjects(modelBuilder);            
        }

        private void SeedStudents(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Student>().HasData(
                    new Student { Id = 1, Name = "Tomas" },
                    new Student { Id = 2, Name = "Juan" },
                    new Student { Id = 3, Name = "Jorge" },
                    new Student { Id = 4, Name = "Ana" },
                    new Student { Id = 5, Name = "Romina" },
                    new Student { Id = 6, Name = "Emanuel" },
                    new Student { Id = 7, Name = "Pedro" },
                    new Student { Id = 8, Name = "Lorena" },
                    new Student { Id = 9, Name = "Ariel" },
                    new Student { Id = 10, Name = "Silvana" }
            );
        }

        private void SeedSubjects(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Subject>().HasData(
                    new Subject { Id = 1, Name = "Matematica" },
                    new Subject { Id = 2, Name = "Historia" },
                    new Subject { Id = 3, Name = "Geografia" },
                    new Subject { Id = 4, Name = "Biologia" },
                    new Subject { Id = 5, Name = "Estadistica" },
                    new Subject { Id = 6, Name = "Fisica" },
                    new Subject { Id = 7, Name = "Quimica" },
                    new Subject { Id = 8, Name = "Lengua" },
                    new Subject { Id = 9, Name = "Ciudadania" },
                    new Subject { Id = 10, Name = "Ingles" }
            );
        }

        private void SeedStudentsSubjects(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<StudentSubject>().HasData(
                    new StudentSubject { StudentId = 1, SubjectId = 1 },
                    new StudentSubject { StudentId = 1, SubjectId = 2 },
                    new StudentSubject { StudentId = 1, SubjectId = 3 },
                    new StudentSubject { StudentId = 2, SubjectId = 2 },
                    new StudentSubject { StudentId = 2, SubjectId = 4 },
                    new StudentSubject { StudentId = 3, SubjectId = 6 },
                    new StudentSubject { StudentId = 3, SubjectId = 10 },
                    new StudentSubject { StudentId = 4, SubjectId = 1 },
                    new StudentSubject { StudentId = 4, SubjectId = 7 },
                    new StudentSubject { StudentId = 4, SubjectId = 8 },
                    new StudentSubject { StudentId = 5, SubjectId = 1 },
                    new StudentSubject { StudentId = 5, SubjectId = 4 }
            );
        }     

    }

}
