using Microsoft.EntityFrameworkCore.Migrations;
using System.Reflection;

#nullable disable

namespace Alumnos.Migrations
{
    public partial class RunSqlScriptAddStudents : Migration
    {
        private const string MIGRATION_SQL_SCRIPT_FILE_NAME = @"Migrations\20220614123715_RunSqlScriptAddStudents.sql";
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sqlFile = Path.Combine(MIGRATION_SQL_SCRIPT_FILE_NAME);
            migrationBuilder.Sql(File.ReadAllText(sqlFile));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM dbo.StudentsSubjects");
            migrationBuilder.Sql("DELETE FROM dbo.Subjects");
            migrationBuilder.Sql("DELETE FROM dbo.Students");
            migrationBuilder.Sql("DBCC CHECKIDENT(Subjects, RESEED, 0)");
            migrationBuilder.Sql("DBCC CHECKIDENT(Students, RESEED, 0)");
        }
    }
}
