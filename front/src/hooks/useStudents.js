import {useState, useEffect} from 'react';
import studentsService from '../services/studentsService';


const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [studentDni, setStudentDni] = useState(null);
  const [studentFileNumber, setStudentFileNumber] = useState(null);  
  
  useEffect( () =>{

    fetchStudents();

  }, [])
  //useEffect(() => { console.log(studentDni) }, [studentDni]);

  const fetchStudents = () => {
    
    setIsLoading(true);
    setIsError(false);

    studentsService.get()
      .then(data => {
        setStudents(data);
      })
      .finally(() => setIsLoading(false))
      .catch(e => {
        setStudents([]);
        console.log(e);
        setIsError(true);
      });
  }

  const addStudent = (newStudent) => {
    
    studentsService.post(newStudent)
      .then(resp => {
                
        fetchStudents();
      })
      .catch(error => {
        console.log(error);
        setIsError(true);
      });
    
  }

  const editStudent = (student) => {
    studentsService.put(student)
      .then(resp => {
                
        fetchStudents();
      })
      .catch(error => {
        console.log(error);
        setIsError(true);
      });    
  }

  const deleteStudent = (studentId) => {

    studentsService.delete(studentId)
      .then(result => {
          if(result) fetchStudents();
      })
      .catch(error => {
        console.log(error);
        setIsError(true);
      });

  }

  const getStudentByDni = (dni) => {
    
    setIsLoading(true);
    setStudentDni(null);
    studentsService.getByDni(dni)
      .then(result => {

        setStudentDni(result);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsError(true);
      });
  }

  const getStudentByFileNumber = (fileNumber) => {
    
    setIsLoading(true);
    setStudentFileNumber(null);
    studentsService.getByFileNumber(fileNumber)
      .then(result => {        

        setStudentFileNumber(result);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsError(true);
      });
  }

  return {
    students,
    isLoading,
    isError,
    studentDni,
    studentFileNumber,

    addStudent,
    editStudent,
    deleteStudent,
    getStudentByDni,
    getStudentByFileNumber,
  }
}

export default useStudents
