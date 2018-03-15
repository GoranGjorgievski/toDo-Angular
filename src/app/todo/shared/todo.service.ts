import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class TodoService {
  toDoList: Array<any>

  constructor() {
    this.toDoList = JSON.parse(localStorage.getItem('todos') || '[]');
  }

  sync(){ //not sure if there is a better way to sync between state and localstorage than calling a function all the time in Anuglar
    localStorage.setItem('todos', JSON.stringify(this.toDoList));
  }

  getToDoList(): Array<any>{
    // return Observable.of(this.toDoList);
    return this.toDoList;
  }

  addToDo(title: string){
    this.toDoList.push({
      key: Date.now(),
      title,
      status: 0
    });
    this.sync();
  }

  toggleStatus(key: number){
    this.toDoList.forEach(todo => {
      if(todo.key === key){
        todo.status = 1 - todo.status;
        return;
      }
    });
    this.sync();
  }

  deleteToDo(key: number){
    this.toDoList = this.toDoList.filter(todo => todo.key !== key);
    this.sync();
  }

  changePriority(key: number, position: number){
    switch(position){
      case 0:
        for(let i = 0; i< this.toDoList.length; i++) { //can also use .forEach...
          if(this.toDoList[i].key === key && i!==this.toDoList.length-1 ){
            let tmp = this.toDoList[i];
            this.toDoList[i] = this.toDoList[i+1];
            this.toDoList[i+1] = tmp;
            return;
          }
        }
        break;
      case 1:
      for(let i = 0; i< this.toDoList.length; i++) { //can also use .forEach...
        if(this.toDoList[i].key === key && i!==0){
          let tmp = this.toDoList[i];
          this.toDoList[i] = this.toDoList[i-1];
          this.toDoList[i-1] = tmp;
          return;
        }
      }
        break;
      default:
        break;
    }
    this.sync();
  }
}
