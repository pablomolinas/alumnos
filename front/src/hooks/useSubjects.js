import {useState, useEffect} from 'react';
import subjectsService from '../services/subjectsService';

const useSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [subjectTotalStudents, setSubjectTotalStudents] = useState(null);

  useEffect(() => {
    
    fetchSubjects();

  }, []);

  const fetchSubjects = () => {

    setIsLoading(true);
    setIsError(false);

    subjectsService.get()
      .then(data => {
        setSubjects(data);
      })
      .finally(() => setIsLoading(false))
      .catch(error => {
        setSubjects([]);
        setIsError(true);
        console.log(error)
      });

  }

  const addSubject = (newSubject) => {
    
    subjectsService.post(newSubject)
      .then(resp => {
                
        fetchSubjects();
      })
      .catch(error => {
        console.log(error);
        setIsError(true);
      });
    
  }

  const editSubject = (subject) => {
    subjectsService.put(subject)
      .then(resp => {
                
        fetchSubjects();
      })
      .catch(error => {
        console.log(error);
        setIsError(true);
      });    
  }

  const deleteSubject = (subjectId) => {

    subjectsService.delete(subjectId)
      .then(result => {
          if(result) fetchSubjects();
      })
      .catch(error => {
        console.log(error);
        setIsError(true);
      });

  }

  const getTotalStudentsBySubjectId = (subjectId, newValue) => {
    subjectsService.getTotalStudents(subjectId)
      .then(result => {
        setSubjectTotalStudents({
          id: subjectId, 
          totalStudents: result,
          newValue // valor recibido por el form, pretende ser el nuevo maximo
        });
      })
      .catch(error => {
        console.log(error);
        setIsError(true);
      })
  }

  return {
      subjects,
      isLoading,
      isError,
      subjectTotalStudents,

      addSubject,
      editSubject,
      deleteSubject,
      fetchSubjects,
      getTotalStudentsBySubjectId,
  }
}

export default useSubjects
