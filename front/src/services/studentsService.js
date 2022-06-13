import {API_URL} from '../constants';
import combineUrl from '../helpers/combineUrl';

class StudentsService {

  get = async () => {
  
    const url = combineUrl(API_URL, "students");
    const response = await fetch(url);
    const json = await response.json();        
    
    if(json && json.success){
        return json.data;
    }
  
    return []
  }
  
  getId = async (id) => {
    
    const url = combineUrl(API_URL, `students/${id}`);
    const response = await fetch(url);
    const json = await response.json();        
    
    if(json && json.success){
        return json.data;
    }
  
    return {}
  }
  
  post = async (student) => {
    const url = combineUrl(API_URL, `students`);
    const response = await fetch(url, {
                                    method: 'POST',
                                    headers: {
                                     'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
                                    },
                                    body: JSON.stringify(student)
                                });
    const json = await response.json();
    
    return (json && json.success) ? true : false;
  }
  
  put = async (student) => {
    const id = student.id;
    delete student.id;
    const url = combineUrl(API_URL, `students/${id}`);
    const response = await fetch(url, {
                                    method: 'PUT',
                                    headers: {
                                     'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
                                    },
                                    body: JSON.stringify(student)
                                });
    const json = await response.json();
    
    return (json && json.success) ? true : false;
  }
  
  delete = async (id) => {
    const url = combineUrl(API_URL, `students/${id}`);
    const response = await fetch(url, {
                                    method: 'DELETE',
                                });
    const json = await response.json();
    
    return (json && json.success) ? true : false;
  }

}

export default new StudentsService();