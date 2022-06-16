import React, {useState, useEffect} from 'react'
import BasicModal from '../../common/BasicModal/BasicModal'
import {studentStyles} from './styles.js';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SubjectsMultiSelect from '../../../components/SubjectsMultiSelect/SubjectsMultiSelect';

const initialFormValues = {    
    id: 0,
    name: "",
    age: 0,
    subjects: []
}

const initialErrors = {
  name: false,
  age: false,
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

    }, [open, currentStudent]);
    
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

          <TextField 
              placeholder="Edad" 
              name="age"
              label="Edad"
              required
              value={values.age}              
              type='number'

              error={errors.age ? true : false} 
              helperText={errors.age?.message}              
              onChange={(e) => handleChange({...values, age: e.target.value})}
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
      const age = parseInt(values.age);

      if(name.trim().length <= 2){
        setErrors({
          ...errors, 
          name : {message: "Nombre debe tener al menos 2 caracteres."}
        });
        return false;
      }

      if(isNaN(age)){
        setErrors({...errors, age: {message: "Edad debe ser un numero."}});
        return false;
      }

      if(age <= 0){
        setErrors({...errors, age: {message: "Edad debe ser un numero mayor que 0."}});
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
        age: parseInt(data.age),
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