import {API_URL} from '../constants';
import combineUrl from '../helpers/combineUrl';

class SubjectsService {

  get = async () => {
  
    const url = combineUrl(API_URL, "subjects");
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
    
    const url = combineUrl(API_URL, `subjects/${id}`);
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

  getTotalStudents = async (subjectId) => {
    
    const url = combineUrl(API_URL, `subjects/totalStudents/${subjectId}`);
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
  
  post = async (subject) => {
    const url = combineUrl(API_URL, `subjects`);
    const response = await fetch(url, {
                                    method: 'POST',
                                    headers: {
                                     'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
                                    },
                                    body: JSON.stringify(subject)
                                });
    if(!response.ok){
      throw new Error(`${response.status} ${response.statusText}, ${url}`);
    }    
    const json = await response.json();
    
    return (json?.success) ? true : false;
  }
  
  put = async (subject) => {
    const id = subject.id;
    delete subject.id;
    const url = combineUrl(API_URL, `subjects/${id}`);
    const response = await fetch(url, {
                                    method: 'PUT',
                                    headers: {
                                     'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
                                    },
                                    body: JSON.stringify(subject)
                                });
    if(!response.ok){
      throw new Error(`${response.status} ${response.statusText}, ${url}`);
    }
    const json = await response.json();
    
    return (json?.success) ? true : false;
  }
  
  delete = async (id) => {
    const url = combineUrl(API_URL, `subjects/${id}`);
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


export default new SubjectsService();