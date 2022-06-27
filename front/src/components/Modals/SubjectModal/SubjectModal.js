import React, {useState, useEffect} from 'react'
import BasicModal from '../../common/BasicModal/BasicModal'
import {subjectStyles} from './styles.js';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { removeSecondsFromTimeString, hhmmToTimeString, timeStringToISOString } from '../../../helpers/time';
import useSubjecValidation from '../../../hooks/useSubjecValidation';

const initialFormValues = {    
    id: 0,
    name: "",
    start: "12:00:00.000",
    end: "12:40:00.000",
    maxStudents: 10
}


const SubjectModal = ({open, onClose, currentSubject, saveSubject}) => {
    const [values, setValues] = useState(initialFormValues);    
    const[errors, isValid, validate, clearErrors] = useSubjecValidation();
    const [changedField, setChangedField] = useState(null);

    useEffect(() =>{      
      
      clearErrors();

      if(currentSubject){        
        setValues({
          ...currentSubject          
        });        
      }else{        
        setValues(initialFormValues);        
      }

    }, [open, currentSubject]);

    useEffect(() => {
      validate(values, [changedField]);
    }, [values]);
    
    const getContent = () => (
        <Box 
          sx={subjectStyles.inputFields}
        >                      
          <TextField 
              placeholder="Nombre" 
              name="name"
              label="Nombre"
              required
              value={values.name}
              autoFocus

              error={errors.name ? true : false} 
              helperText={errors.name?.message}              
              onChange={(e) => handleChange(e.target)}
          />
          
          <TextField
            label="Inicio"
            name="start"
            type="time"
            format="HH:mm"
            value={removeSecondsFromTimeString(values.start)}
            onChange={(e) => {
                e.target.value = hhmmToTimeString(e.target.value);
                handleChange(e.target);
              }}
            required
            
            error={errors.start ? true : false} 
            helperText={errors.start?.message}   
          />

          <TextField
            label="Final"
            name="end"
            type="time"
            format="HH:mm"
            value={removeSecondsFromTimeString(values.end)}
            onChange={(e) => {
                e.target.value = hhmmToTimeString(e.target.value);
                handleChange(e.target);
              }}
            required
            
            error={errors.end ? true : false} 
            helperText={errors.end?.message}   
          />

          <TextField
            label="Cantidad máxima de alumnos"
            name="maxStudents"
            type="number"            
            value={values.maxStudents}
            onChange={(e) => handleChange(e.target)}
            required            

            error={errors.maxStudents ? true : false} 
            helperText={errors.maxStudents?.message}   
          />
          
        </Box>
    )

    const handleChange = (target) => {       
      
      setChangedField(target.name);
      setValues({
        ...values, 
        [target.name]: target.value
      });
    } 
    

    const handleSaveSubject = (data) => {

      if(!validate(values)) return;
            
      const allData = {
        ...data, 
        id: currentSubject ? currentSubject.id : 0,
        maxStudents: parseInt(values.maxStudents),
        start: timeStringToISOString(values.start),
        end: timeStringToISOString(values.end)
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
            disableSubmit={!isValid}
            
            onSubmit={() => handleSaveSubject(values)}
        />
    )
}

export default SubjectModal