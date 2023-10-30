import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Todo } from "./new-todos/todo.interface";
@Injectable({
  providedIn: "root",
})
export class DataShareService {
  constructor() {}
  private selectedTodo = new BehaviorSubject<Todo | null>(null);
  selectedTodo$ = this.selectedTodo.asObservable();

  setTodo(todo: any) {
    this.selectedTodo.next(todo);
  }

  clearTodo() {
    this.selectedTodo.next(null);
  }
}
