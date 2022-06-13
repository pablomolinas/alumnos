import {useState, useEffect} from 'react';
import subjectsService from '../services/subjectsService';

const useSubjects = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    
    subjectsService.get()
      .then(data => {
        
        setSubjects(data);
      })
      .catch(error => {
        console.log(error)
      });


  }, []);

  return [subjects]
}

export default useSubjects
