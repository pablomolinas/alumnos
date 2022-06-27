import {API_URL} from '../constants';
import combineUrl from '../helpers/combineUrl';

class StudentsService {

  get = async () => {
  
    const url = combineUrl(API_URL, "students");
    const response = await fetch(url);

    if(!response.ok){
      throw new Error(`${response.status} ${response.statusText}, ${url}`);
    }

    const json = await response.json();        
    
    if(json?.success){
        return json.data;
    }
  
    return []
  }
  
  getId = async (id) => {
    
    const url = combineUrl(API_URL, `students/${id}`);
    const response = await fetch(url);
    if(!response.ok){
      throw new Error(`${response.status} ${response.statusText}, ${url}`);
    }
    const json = await response.json();        
    
    if(json?.success){
        return json.data;
    }
  
    return {}
  }

  getByDni = async (dni) => {
    
    const url = combineUrl(API_URL, `students/dni/${dni}`);
    const response = await fetch(url);
    if(response.status >= 500){
      throw new Error(`${response.status} ${response.statusText}, ${url}`);
    }
    const json = await response.json();        
    
    if(json?.success){
        return json.data;
    }
  
    return null
  }

  getByFileNumber = async (fileNumber) => {
    
    const url = combineUrl(API_URL, `students/fileNumber/${fileNumber}`);
    const response = await fetch(url);
    if(response.status >= 500){
      throw new Error(`${response.status} ${response.statusText}, ${url}`);
    }
    const json = await response.json();        
    
    if(json?.success){
        return json.data;
    }
    return null
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
    
    if(!response.ok){
      throw new Error(`${response.status} ${response.statusText}, ${url}`);
    }
    const json = await response.json();
    
    return (json?.success) ? true : false;
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
    
    if(!response.ok){
      throw new Error(`${response.status} ${response.statusText}, ${url}`);
    }
    const json = await response.json();
    
    return (json?.success) ? true : false;
  }
  
  delete = async (id) => {
    const url = combineUrl(API_URL, `students/${id}`);
    const response = await fetch(url, {
                                    method: 'DELETE',
                                });

    if(!response.ok){
      throw new Error(`${response.status} ${response.statusText}, ${url}`);
    }
    const json = await response.json();
    
    return (json?.success) ? true : false;
  }

}

export default new StudentsService();