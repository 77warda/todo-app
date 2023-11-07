import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { TodoServiceService } from "../app/todo-service.service";
import { Todo } from "./new-todos/todo.interface";
import { DataShareService } from "./data-share.service";
import {
  Observable,
  async,
  catchError,
  filter,
  map,
  switchMap,
  tap,
  toArray,
} from "rxjs";

@Component({
  selector: "org-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  allTodos: Todo[] = [];
  selectedTodo: Todo | null = null;
  erroMessage = "";
  products$: Observable<Todo[]>;

  ngOnInit(): void {
    // this.todoService.getTodos().subscribe(
    //   (todos) => {
    //     console.log("Server Response - Todos: ", todos);
    //     this.allTodos = todos;
    //   },
    //   (error) => {
    //     this.erroMessage = `Network error ${error.message}`;
    //     // alert(`Network error ${error.message}`);
    //     console.error("Error fetching Todos: ", error);
    //   }
    // );
    this.fetchTodos();
  }
  constructor(
    private todoEdit: DataShareService,
    private todoService: TodoServiceService
  ) {}

  editTodo(todo: Todo) {
    this.selectedTodo = todo;
  }
  addTodo(newTodo: Todo) {
    this.todoService.addTodo(newTodo).subscribe((response) => {
      console.log("server response", response);
      this.allTodos.push(response);
      this.fetchTodos();
    });
  }

  updateTodo(updatedTodo: Todo) {
    this.todoService
      .updateTodo(updatedTodo.id, updatedTodo)
      .subscribe((update) => {
        const index = this.allTodos.findIndex(
          (todo) => todo.id === updatedTodo.id
        );
        if (index !== -1) {
          this.allTodos[index] = update;
        }
      });
    this.todoEdit.clearTodo();
  }
  handleTodoUpdated(updatedTodo: Todo) {
    this.todoEdit.selectedTodo$.subscribe((x) => {
      this.selectedTodo = x;
    });
    console.log("todo", this.selectedTodo);

    if (this.selectedTodo) {
      const obj = {
        ...this.selectedTodo,
        name: updatedTodo.name,
      };
      this.updateTodo(obj);
      this.selectedTodo = null;
    } else {
      this.addTodo(updatedTodo);
    }
  }

  fetchTodos() {
    // this.todoService.getTodos().subscribe((response) => {
    //   this.allTodos = response;
    // });
    // this.products$ = this.todoService.getTodos();
    this.products$ = this.todoService.getTodos().pipe(
      tap((response) => {
        this.allTodos = response;
      }),
      catchError((error) => {
        this.erroMessage = `Network error ${error.message}`;
        return [];
      })
    );
  }
  markCompleted(todo: Todo) {
    if (todo.id !== undefined) {
      this.todoService.markAsComplete(todo.id, !todo.complete).subscribe(() => {
        todo.complete = !todo.complete;
      });
    }
  }
  pinnedTodo(todo: Todo) {
    if (todo.id !== undefined) {
      this.todoService.pinTodo(todo.id, !todo.pin).subscribe(() => {
        todo.pin = !todo.pin;
      });
    }
  }

  deleteTodo(todoId: string) {
    console.log("delete", todoId);
    this.todoService.deleteTodo(todoId).subscribe(() => {
      this.allTodos = this.allTodos.filter((todo) => todo.id !== todoId);
      this.fetchTodos();
    });
  }

  clearCompleted() {
    const completedTodoIds = this.allTodos
      .filter((todo) => todo.complete)
      .map((todo) => todo.id);
    console.log("completed ids", completedTodoIds);

    completedTodoIds.forEach((todoId) => {
      this.todoService.deleteTodo(todoId).subscribe(() => {
        this.allTodos = this.allTodos.filter((todo) => todo.id !== todoId);
      });
    });
    this.fetchTodos();
  }
}
