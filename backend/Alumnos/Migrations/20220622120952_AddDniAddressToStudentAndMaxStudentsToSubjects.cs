using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Alumnos.Migrations
{
    public partial class AddDniAddressToStudentAndMaxStudentsToSubjects : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<TimeSpan>(
                name: "End",
                table: "Subjects",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<int>(
                name: "MaxStudents",
                table: "Subjects",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "Start",
                table: "Subjects",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Students",
                type: "nvarchar(255)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Dni",
                table: "Students",
                type: "nvarchar(8)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "FileNumber",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddUniqueConstraint(
                name: "FileNumber_unique",
                table: "Students",
                column: "FileNumber");

            migrationBuilder.AddUniqueConstraint(
                name: "Dni_unique",
                table: "Students",
                column: "Dni");
                       
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "End",
                table: "Subjects");

            migrationBuilder.DropColumn(
                name: "MaxStudents",
                table: "Subjects");

            migrationBuilder.DropColumn(
                name: "Start",
                table: "Subjects");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Dni",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "FileNumber",
                table: "Students");
        }
    }
}
