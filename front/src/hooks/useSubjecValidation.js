import { useEffect, useState } from "react";
import { regex } from "../constants";
import useSubjects from "./useSubjects";
import useTypingTimeout from "./useTypingTimeout";

const initialErrors = {
  name: false,
  start: false,
  end: false,
  maxStudents: false
}

const useSubjecValidation = () => {
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setIsValid] = useState(false);
  const {subjectTotalStudents, getTotalStudentsBySubjectId} = useSubjects();
  const [ isTypingMaxStudents, setTypingMaxStudents, stopTypingMaxStudents] = useTypingTimeout(1000);
  
  const clearErrors = () => {
    setErrors(initialErrors);
  }

  useEffect(() => { 
    
    if(errors?.maxStudents) stopTypingMaxStudents(); 
    checkIsvalid();

  }, [errors]);
  useEffect(( )=> { validateCurrentMaxStudents(); }, [subjectTotalStudents]);
  
  const validateCurrentMaxStudents = () => {    
    if(subjectTotalStudents && subjectTotalStudents?.totalStudents > subjectTotalStudents?.newValue ) {
      setErrors({ ...errors, maxStudents: {message: `No se puede establecer ${subjectTotalStudents?.newValue} como nuevo valor, ya que es inferior a la cantidad de alumnos inscriptos actualmente (${subjectTotalStudents.totalStudents}).`} });
    }
    checkIsvalid();
  }

  const checkIsvalid = () => {
    const result = Object.keys(errors).find(key => errors[key] !== false) === undefined ? true : false;
    setIsValid(result && !isTypingMaxStudents);
  }

  const validateName = (subject) => {
    const name = subject.name;

    if(name.trim().length < 2 || name.trim().length > 120){      
      return {message: "Nombre debe tener minimo 2 caracteres, maximo 120."};
    }else      
      if(!regex.name.test(name)){        
        return {message: "Nombre debe comenzar con una letra. Admite letras, numeros, $, #, -, ()."};
      }

    return false
  }

  const validateMaxStudents = (subject) => {
    const maxStudents = parseInt(subject.maxStudents);

    if(isNaN(maxStudents)){      
      return {message: "Cantidad maxima de alumnos debe ser un numero."};
    }else    
      if(maxStudents <= 0 || maxStudents > 300){        
        return {message: "Cantidad maxima de alumnos debe ser un numero mayor que 0, menor que 300."};
      }else{ // cantidad valida
        if(subject.id !== 0){
          //getTotalStudentsBySubjectId(subject.id, maxStudents)
          setTypingMaxStudents( () => getTotalStudentsBySubjectId(subject.id, maxStudents) ); // se envia el que pretende ser el nuevo maximo
        }
      }
    
    return false;
  }

  const validateStart = (subject) => {
    const start = subject.start;

    if(!regex.timeFormatString.test(start)){      
      return {message: "Formato invalido para hora inicial (HH:mm)."};
    }

    return false;
  }

  const validateEnd = (subject) => {
    const end = subject.end;

    if(!regex.timeFormatString.test(end)){      
      return {message: "Formato invalido para hora final (HH:mm)."};
    }

    return false;
  }
  
  const validate = (subject, fields=[]) => {
    var e = {};
    var f = [];

    setIsValid(false);
    
    if(fields.length === 0){ // todos
      clearErrors();
      e = {...initialErrors};
      f = Object.keys(initialErrors);
    }else{ // algunos
      e = {...errors};
      f = fields;
    }

    f.map(field => {
      switch (field) {
        case 'name':
          e.name = validateName(subject);break;
        case 'maxStudents':
          e.maxStudents = validateMaxStudents(subject);break;
        case 'start':
          e.start = validateStart(subject);break;
        case 'end':
          e.end = validateEnd(subject);break;
        default:
          break;
      }
    });
    
    setErrors(e);
    const result = Object.keys(e).filter(key => e[key] !== false);
    return result.length > 0 ? false : true;
  }
  
  
  return [
    errors,
    isValid,

    validate,
    clearErrors
  ]
}

export default useSubjecValidation
