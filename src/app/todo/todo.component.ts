import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  toDoListArray: any;
  isFiltering: boolean = false;

  constructor(private toDoService: TodoService) { }

  ngOnInit() {
    // I am not sure how to subscribe/observe on a service component array elements change
    // this.toDoService.getToDoList().subscribe(toDoList =>
    //   {
    //     this.toDoListArray = [];
    //     toDoList.forEach(element => {
    //     this.toDoListArray.push(element);
    //   }
    //  )}
    // );
    this.getToDos();
  }

  deleteToDo(key: number){
    this.toDoService.deleteToDo(key);
    this.getToDos();
    // no idea why its not syncing when you delete, but it is when adding an element -
    //i guess it has something to do with the reference
  }

  getToDos(){
    this.toDoListArray = this.toDoService.getToDoList();
  }

  addToDo(input: HTMLInputElement){
    if(input.value !== ''){
      this.toDoService.addToDo(input.value);
    }

    input.value = '';
  }

  toggleToDo(key: number){
    this.toDoService.toggleStatus(key);
  }

  handleChangePriority(key: number, position: number){
    if(this.isFiltering)
      return;
    this.toDoService.changePriority(key, position);
  }

  handleSearch(text: string){
    if(text === '') { //reset filter
      this.getToDos();
      this.isFiltering = false;
      return;
    }
    this.isFiltering = true;
    this.toDoListArray = this.toDoListArray.filter(item => {
      return item.title.includes(text);
    })
  }

}
