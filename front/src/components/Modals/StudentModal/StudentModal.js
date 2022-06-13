import React, {useState, useEffect} from 'react'
import BasicModal from '../../common/BasicModal/BasicModal'
import {studentStyles} from './styles.js';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SubjectsMultiSelect from '../../../components/SubjectsMultiSelect/SubjectsMultiSelect';

const initialFormValues = {    
    id: 0,
    name: "",
    subjects: []
}

const initialErrors = {
  name: false,
}

const StudentModal = ({open, onClose, currentStudent, saveStudent, subjects}) => {
    const [values, setValues] = useState(initialFormValues);
    const [errors, setErrors] = useState(initialErrors);

    useEffect(() =>{      
      
      setErrors(initialErrors);

      if(currentStudent){        
        setValues({
          ...currentStudent,
          subjects: Object.keys(currentStudent.subjects).map(key => currentStudent.subjects[key].name)
        });        
      }else{        
        setValues(initialFormValues);        
      }

    }, [open]);
    
    const getContent = () => (
        <Box sx={studentStyles.inputFields}>                      
          <TextField 
              placeholder="Nombre" 
              name="name"
              label="Nombre"
              required
              value={values.name}
              autoFocus

              error={errors.name ? true : false} 
              helperText={errors.name?.message}              
              onChange={(e) => handleChange({...values, name: e.target.value})}
          />
          <SubjectsMultiSelect 
            name="subjects"
            subjects={subjects}
            values={values.subjects}
            
            setValues={(s) => setValues({...values, subjects: s})}
          />
        </Box>
    )

    const handleChange = (changedValues) => {        
      validate();  
      setValues(changedValues);        
    } 
    
    const validate = () => {
      const name = values.name;

      if(name.trim().length <= 2){
        setErrors({
          ...errors, 
          name : {message: "Nombre debe tener al menos 2 caracteres."}
        });
        return false;
      }
      
      setErrors(initialErrors);
      return true;
    }

    const handleSaveStudent = (data) => {

      if(!validate()) return;
      
      // array de strings => array de objetos
      const selSubjects = subjects.filter(item => values.subjects.includes(item.name))
      
      const allData = {
        ...data, 
        id: currentStudent ? currentStudent.id : 0, 
        subjects: selSubjects
      }; 
      
      saveStudent(allData);
    }

  
    return (
        <BasicModal
            open={open}
            onClose={onClose}
            content={getContent()}
            title={currentStudent ? "Editar alumno" : "Nuevo alumno"}
            subTitle=""
            
            onSubmit={() => handleSaveStudent(values)}
        />
    )
}

export default StudentModal