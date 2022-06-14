INSERT INTO dbo.Subjects (Name) 
VALUES 
('Analisis Matematico'),
('Algebra'), 
('Fisica'), 
('Estadistica'),
('Organizacion empresarial'), 
('Laboratorio I');


INSERT INTO dbo.Students (Name, Age)
VALUES
('Julian', 34),
('Ignacio', 22),
('Maria', 18),
('Soledad', 42),
('Fabio', 24);

INSERT INTO dbo.StudentsSubjects (StudentId, SubjectId)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);
