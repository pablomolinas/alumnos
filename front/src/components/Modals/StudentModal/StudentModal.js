import React, {useState, useEffect} from 'react'
import BasicModal from '../../common/BasicModal/BasicModal'
import {studentStyles} from './styles.js';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SubjectsMultiSelect from '../../../components/SubjectsMultiSelect/SubjectsMultiSelect';
import useStudentValidation from '../../../hooks/useStudentValidation';

const initialFormValues = {    
    id: 0,
    name: "",
    age: 18,
    dni: "",
    fileNumber: "",
    address: "",
    subjects: []
}


const StudentModal = ({open, onClose, currentStudent, saveStudent, subjects}) => {
    const [values, setValues] = useState(initialFormValues);    
    const[errors, isValid, validate, clearErrors] = useStudentValidation();
    const [changedField, setChangedField] = useState(null);

    useEffect(() =>{      
      
      clearErrors();

      if(currentStudent){        
        setValues({
          ...currentStudent,
          subjects: Object.keys(currentStudent.subjects).map(key => currentStudent.subjects[key].name)
        });        
      }else{        
        setValues(initialFormValues);        
      }

    }, [open, currentStudent]);

    useEffect(() => {
      validate(values, [changedField]);
    }, [values]);

    /**
     * si nuevo alumno retorna solo materias disponibles para inscripcion
     * si edit alumno -> si el alumno esta inscripto en la materia completa se muestra
     *                -> si el alumno no pertenece a la materia completa no se muestra
     * @returns [subjects]
     */
    const getSubjects = () => {
      if(subjects === null || currentStudent?.subjects === null) return [];
      
      try {  
        if(values.id === 0){
          return subjects.filter(s => s.totalStudents < s.maxStudents);
        }

        return subjects.filter(s => {
            const exist = currentStudent.subjects.some(cs => cs.id === s.id);            
            return exist || !exist && s.totalStudents < s.maxStudents ? true : false;
        })
      }catch{};

      return subjects;      
    }
    
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
              onChange={(e) => handleChange(e.target)}
          />

          <TextField 
              placeholder="Nro de Legajo" 
              name="fileNumber"
              label="Legajo"
              required
              value={values.fileNumber}              
              type='number'              
              disabled={ values.id === 0 ? false : true }

              error={errors.fileNumber ? true : false} 
              helperText={errors.fileNumber?.message}              
              onChange={(e) => handleChange(e.target)}
          />

          <TextField 
              placeholder="Dni" 
              name="dni"
              label="Dni"
              required
              value={values.dni}              
              type='number'
              disabled={ values.id === 0 ? false : true }

              error={errors.dni ? true : false} 
              helperText={errors.dni?.message}              
              onChange={(e) => handleChange(e.target)}
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
              onChange={(e) => handleChange(e.target)}
          />

          <TextField 
              placeholder="Direccion" 
              name="address"
              label="Direccion"
              required
              value={values.address}              
              type='text'

              error={errors.address ? true : false} 
              helperText={errors.address?.message}              
              onChange={(e) => handleChange(e.target) }
          />

          <SubjectsMultiSelect 
            name="subjects"
            subjects={getSubjects()}
            values={values.subjects}
            
            setValues={(s) => setValues({...values, subjects: s})}
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
        

    const handleSaveStudent = (data) => {

      if(!validate(values)) return;
      
      // array de strings => array de objetos
      const selSubjects = subjects.filter(item => values.subjects.includes(item.name))
      
      const allData = {
        ...data, 
        id: currentStudent ? currentStudent.id : 0,
        age: parseInt(data.age),
        fileNumber: parseInt(data.fileNumber),
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
            disableSubmit={!isValid}
            
            onSubmit={() => handleSaveStudent(values)}
        />
    )
}

export default StudentModal