import {isTest, testList, testItems} from '../components/utils';
class ListService {
  constructor(props){
    this.test = isTest();
    this.baseURL = window.location.origin;
    if (process.env.REACT_APP_SUB_BASE!==""){
      this.baseURL += "/"+process.env.REACT_APP_SUB_BASE;
    }
  }

  searchList({api, searchString, results}){
    if (!this.test){
      fetch(this.baseURL+`/api/${api}?q=${searchString}`)
      .then(results => {
        return results.json()})
      .then(data => {
        results(data);
      })
    } else {
      console.log("Test mode returning test list (NOT from "+this.baseURL+")");
      results(testList());
    }
  }

  getList({key, result, error}){
    //TO-DO - return when testing, and valid return
    //a valid result could be an error (i.e. a list has been deleted, so I need to handle properly)
    if (!this.test){
      fetch(`${this.baseURL}/api/get?id=${key}`)
      .then(results => {return results.json()})
      .then(data => {
        if (data["error"]){
          error(data["error"]);
        } else {
          result(data);
        }
      })      
    } else {
      console.log("Test mode returning for key:"+key);
      result(testItems()[key]);
    }
  }

  saveOrUpdateList({save, form, result}){
    if (!this.test){
      let api = '/api/update';
      if (save) {api = '/api/save';}
      fetch(this.baseURL+api, {
        method: 'POST',
        body: JSON.stringify(form),
      }).then((response) => {
        return response.json();
      }).then((jsonData) => {
        result();
      });
    } else {
      result();
    }
  }

deleteList({key, result}){
  if (!this.test){
    fetch(`${this.baseURL}/api/delete?id=${key}`, {
      method: 'DELETE',
    }).then((response) => {
      return response.json();
    }).then((jsonData) => {
      result();
    });
  } else {
      result();
    }
  }
}

export default ListService;