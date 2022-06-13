import {API_URL} from '../constants';
import combineUrl from '../helpers/combineUrl';

class SubjectsService {

  get = async () => {
  
    const url = combineUrl(API_URL, "subjects");
    const response = await fetch(url);
    const json = await response.json();        
    
    if(json && json.success){
        return json.data;
    }
    
    return []
  }
}


export default new SubjectsService();