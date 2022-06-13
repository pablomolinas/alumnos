import React, {useState, useEffect} from 'react';
import CommonButton from '../../components/common/CommonButton/CommonButton';
import GridWrapper from '../../components/common/GridWrapper/GridWrapper';
import StudentsTable from '../../components/StudentsTable/StudentsTable';
import useSubjects from '../../hooks/useSubjects';
import useStudents from '../../hooks/useStudents';
import StudentModal from '../../components/Modals/StudentModal/StudentModal';
import BasicSnackbar from '../../components/common/BasicSnackbar/BasicSnackbar';

const Alumnos = () => {

  const [open, setOpen] = useState(false); // modal new
  const [students, isError, addStudent, editStudent, deleteStudent] = useStudents();
  const [subjects] = useSubjects();
  const [currentStudent, setCurrentStudent] = useState(null);
  const [openMessage, setOpenMessage] = useState(false);


  useEffect(() => {
    if(!open){
      setCurrentStudent(null);
    }
  }, [open])

  const handleEditStudent = (student) => {
    
    setCurrentStudent(student);
    setOpen(true);
    
  }

  const handleSaveStudent = (student) => {

    if(student.id)
      editStudent(student);
    else
      addStudent(student);
    setOpen(false);
    setOpenMessage(true);
  }

  const handleDeleteStudent = (studentId) => {
    if(window.confirm("confirma eliminar?")){
      deleteStudent(studentId);
    }    
  } 

  return (
    <GridWrapper>      
      
      <CommonButton
        variant='contained'
        onClick={() => { setCurrentStudent(null);setOpen(true); }}
      >
        Nuevo Alumno
      </CommonButton>        
      
      <StudentsTable
        students={students}
        editStudent={handleEditStudent}
        deleteStudent={handleDeleteStudent}
      />
      
      <StudentModal
        open={open}
        currentStudent={currentStudent}
        subjects={subjects}
        
        onClose={() => setOpen(false) }
        saveStudent={handleSaveStudent}
      />
      <BasicSnackbar 
        open={false} 
        onClose={() => setOpenMessage(false)} 
        severity={isError ? "error" : "success"} 
        message={isError ? "La operacion no pudo completarse." : "Operacion completada exitosamente." }
      />
    </GridWrapper>
  )
}

export default Alumnos;