import React, {useState, useEffect} from 'react'
import BasicModal from '../../common/BasicModal/BasicModal'
import {subjectStyles} from './styles.js';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const initialFormValues = {    
    id: 0,
    name: "",    
}

const initialErrors = {
  name: false,
}

const SubjectModal = ({open, onClose, currentSubject, saveSubject}) => {
    const [values, setValues] = useState(initialFormValues);
    const [errors, setErrors] = useState(initialErrors);

    useEffect(() =>{      
      
      setErrors(initialErrors);

      if(currentSubject){        
        setValues({
          ...currentSubject          
        });        
      }else{        
        setValues(initialFormValues);        
      }

    }, [open]);
    
    const getContent = () => (
        <Box sx={subjectStyles.inputFields}>                      
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

    const handleSaveSubject = (data) => {

      if(!validate()) return;
            
      const allData = {
        ...data, 
        id: currentSubject ? currentSubject.id : 0
      }; 
      
      saveSubject(allData);
    }

  
    return (
        <BasicModal
            open={open}
            onClose={onClose}
            content={getContent()}
            title={currentSubject ? "Editar materia" : "Nuevo materia"}
            subTitle=""
            
            onSubmit={() => handleSaveSubject(values)}
        />
    )
}

export default SubjectModal