import {useState, useEffect} from 'react';
import studentsService from '../services/studentsService';


const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  useEffect( () =>{

    fetchStudents();
    
  }, [])

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
        console.log(`error: ${e}`);
        setIsError(true);
      });
  }

  const addStudent = (newStudent) => {
    
    studentsService.post(newStudent)
      .then(resp => {
                
        fetchStudents();
      })
      .catch(error => {
        console.log(`error: ${error}`);
        setIsError(true);
      });
    
  }

  const editStudent = (student) => {
    studentsService.put(student)
      .then(resp => {
                
        fetchStudents();
      })
      .catch(error => {
        console.log(`error: ${error}`);
        setIsError(true);
      });    
  }

  const deleteStudent = (studentId) => {

    studentsService.delete(studentId)
      .then(result => {
          if(result) fetchStudents();
      })
      .catch(error => {
        console.log(`error: ${error}`);
        setIsError(true);
      });

  }

  return [
    students,
    isLoading,
    isError,

    addStudent,
    editStudent,
    deleteStudent,
  ]
}

export default useStudents
