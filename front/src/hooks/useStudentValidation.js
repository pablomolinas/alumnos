import { ConstructionOutlined } from '@mui/icons-material';
import {useEffect, useState} from 'react'
import { regex } from '../constants';
import useStudents from './useStudents';
import useTypingTimeout from './useTypingTimeout';


const initialErrors = {
  name: false,
  age: false,
  dni: false,
  fileNumber: false,
  address: false
}

const useStudentValidation = () => {
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setIsValid] = useState(false);
  const {isLoading, studentDni, studentFileNumber, getStudentByDni, getStudentByFileNumber} = useStudents();
  const [isTypingDni, setTypingDni, stopTypingDni] = useTypingTimeout(1000);
  const [isTypingFileNumber, setTypingFileNumber, stopTypingFileNumber] = useTypingTimeout(1000);
  
  const clearErrors = () => {
    setErrors(initialErrors);
  }

  useEffect(() => existDni(), [studentDni]);
  useEffect(() => existFileNumber(), [studentFileNumber]);
  useEffect(() => { if(isLoading) checkIsvalid() }, [isLoading]);
  useEffect(() => { 
    if(errors?.dni) stopTypingDni();
    if(errors?.fileNumber) stopTypingFileNumber();
    checkIsvalid();
  }, [errors]);

  const checkIsvalid = () => {
    const result = Object.keys(errors).find(key => errors[key] !== false) === undefined ? true : false;
    setIsValid(result && !isTypingDni && !isTypingFileNumber);
  }

  const existDni = () => {    
    if(studentDni) setErrors({ ...errors, dni: {message: "El Dni ingresado ya existe."} });
  }

  const existFileNumber = () => {
    if(studentFileNumber) setErrors({ ...errors, fileNumber: {message: "El numero de legajo ingresado no esta disponible."} });
  }

  const validateName = (student) => {
    const name = student.name;

    if(name.trim().length < 2 || name.trim().length > 120) 
      return {message: "Nombre debe tener al menos 2 caracteres, maximo 120."};      
    else
      if(!regex.personName.test(name))
        return {message: "Nombre solo admite letras (maximo 120 caracteres)."};
    
    return false;      
  }

  const validateDni = (student) => {
    const dni = parseInt(student.dni);
    
    if(isNaN(dni)){
      return {message: "Dni es un campo requerido."};
    }else
      if(!regex.dni.test(dni)){        
        return {message: "Dni solo admite numeros (8 digitos)."};        
      }else
        if(student.id === 0){ // dni valido, si es un nuevo alumno
          setTypingDni( () => getStudentByDni(dni) );
        }

    return false;
  }

  const validateFileNumber = (student) => {
    const fileNumber = parseInt(student.fileNumber);

    if(isNaN(fileNumber)){
      return {message: "Nro de legajo es un campo requerido."};
    }else
      if(fileNumber <= 0){
        return {message: "Nro de legajo debe ser mayor que 0."};
      }else
        if(!regex.onlyNumbers.test(fileNumber)){
          return {message: "Nro de legajo solo admite numeros."};
        }else
          if(student.id === 0){ // legajo valido, si es un nuevo alumno
            setTypingFileNumber( () => getStudentByFileNumber(fileNumber) );
          }

    return false;
  }

  const validateAge = (student) => {
    const age = parseInt(student.age);

    if(isNaN(age)){
      return {message: "Edad debe ser un numero."};
    }else    
      if(age <= 0 || age > 120){
        return {message: "Edad debe ser un numero mayor que 0, menor a 120."};
      }

    return false;
  }

  const validateAddress = (student) => {
    const address = student.address;

    if(address.trim().length < 5 || address.trim().length > 255){
      return {message: "Direccion debe tener al menos 5 caracteres, maximo 255."};
    }    

    return false;
  }

  const validate = (student, fields=[]) => {
    var f = [];
    var e = {};
    setIsValid(false);

    if(fields.length !== 0){ // campo especifico
      f = fields;      
      e = {...errors};
    }else{ // todos      
      clearErrors();
      e = {...initialErrors};
      f = Object.keys(e);
    }


    f.map(field => {
      switch (field) {
        case 'name':
          e.name = validateName(student);break;
        case 'dni':
          e.dni = validateDni(student);break;
        case 'fileNumber':
          e.fileNumber = validateFileNumber(student);break;
        case 'age':
          e.age = validateAge(student);break;
        case 'address':
          e.address = validateAddress(student);break;
        default:
          break;
      }

      return null;
    });    
    
    const result = Object.keys(e).filter( (key) => e[key] !== false );
    setErrors(e);
    
    return result.length > 0 ? false : true; 
  }

  return [
    errors,
    isValid,

    validate,
    clearErrors
  ]
}

export default useStudentValidation
