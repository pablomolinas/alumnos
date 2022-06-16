import React, {useState, useEffect} from 'react'
import GridWrapper from '../../components/common/GridWrapper/GridWrapper';
import SubjectsTable from '../../components/SubjectsTable/SubjectsTable';
import useSubjects from '../../hooks/useSubjects';
import CommonButton from '../../components/common/CommonButton/CommonButton';
import SubjectModal from '../../components/Modals/SubjectModal/SubjectModal';
import BasicSnackbar from '../../components/common/BasicSnackbar/BasicSnackbar';

const Database = () => {
  const [open, setOpen] = useState(false); // modal new
  const [subjects, isLoading, isError, addSubject, editSubject, deleteSubject] = useSubjects();
  const [currentSubject, setCurrentSubject] = useState(null);
  const [openMessage, setOpenMessage] = useState(false);

  useEffect(() => {
    if(!open){
      setCurrentSubject(null);
    }
  }, [open]);

  const handleEditSubject = (subject) => {
    
    setCurrentSubject(subject);
    setOpen(true);
    
  }

  const handleSaveSubject = (subject) => {    
    
    if(subject.id)
      editSubject(subject);
    else
      addSubject(subject);
    setOpen(false);
    setOpenMessage(true);  
  
  }

  const handleDeleteSubject = (subjectId) => {
    if(window.confirm("confirma eliminar?")){
      deleteSubject(subjectId);
    } 
  }


  return (
    <GridWrapper >
      <CommonButton
        variant='contained'
        onClick={() => { setCurrentSubject(null);setOpen(true); }}
      >
        Nueva materia
      </CommonButton>
      
      <SubjectsTable 
        subjects={subjects}
        isLoading={isLoading}

        editSubject={handleEditSubject}
        deleteSubject={handleDeleteSubject}
      />

      <SubjectModal
        open={open}
        currentSubject={currentSubject}        
        
        onClose={() => setOpen(false) }
        saveSubject={handleSaveSubject}
      />

      <BasicSnackbar 
        open={openMessage} 
        onClose={() => setOpenMessage(false)} 
        severity={isError ? "error" : "success"} 
        message={isError ? "La operacion no pudo completarse." : "Operacion completada exitosamente." }
      />
    </GridWrapper>
  )
}

export default Database
