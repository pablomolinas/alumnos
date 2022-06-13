import {useState, useEffect} from 'react';
import subjectsService from '../services/subjectsService';

const useSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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
        console.log(error)
      });

  }

  const addSubject = (newSubject) => {
    
    subjectsService.post(newSubject)
      .then(resp => {
                
        fetchSubjects();
      })
      .catch(error => {
        console.log(`error: ${error}`);
        setIsError(true);
      });
    
  }

  const editSubject = (subject) => {
    subjectsService.put(subject)
      .then(resp => {
                
        fetchSubjects();
      })
      .catch(error => {
        console.log(`error: ${error}`);
        setIsError(true);
      });    
  }

  const deleteSubject = (subjectId) => {

    subjectsService.delete(subjectId)
      .then(result => {
          if(result) fetchSubjects();
      })
      .catch(error => {
        console.log(`error: ${error}`);
        setIsError(true);
      });

  }

  return [
      subjects,
      isLoading,
      isError,

      addSubject,
      editSubject,
      deleteSubject,
    ]
}

export default useSubjects
