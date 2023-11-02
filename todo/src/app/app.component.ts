import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { TodoServiceService } from "../app/todo-service.service";
import { Todo } from "./new-todos/todo.interface";
import { DataShareService } from "./data-share.service";

@Component({
  selector: "org-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  allTodos: Todo[] = [];
  showLoader: boolean = true;
  selectedTodo: Todo | null = null;
  erroMessage = "";

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(
      (todos) => {
        console.log("Server Response - Todos: ", todos);
        this.allTodos = todos;
      },
      (error) => {
        this.erroMessage = `Network error ${error.message}`;
        // alert(`Network error ${error.message}`);
        console.error("Error fetching Todos: ", error);
      }
    );
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

  deleteTodo(todoId: number) {
    console.log("delete", todoId);
    this.todoService.deleteTodo(todoId).subscribe(() => {
      this.allTodos = this.allTodos.filter((todo) => todo.id !== todoId);
      this.fetchTodos();
    });
  }

  fetchTodos() {
    this.todoService.getTodos().subscribe((response) => {
      this.allTodos = response;
    });
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

  clearCompleted() {
    const completedTodoIds = this.allTodos
      .filter((todo) => todo.complete && todo.id !== undefined)
      .map((todo) => todo.id as number);
    completedTodoIds.forEach((todoId) => {
      this.todoService.deleteTodo(todoId).subscribe(() => {
        this.allTodos = this.allTodos.filter((todo) => {
          return todo.id !== todoId;
        });
        this.fetchTodos();
      });
    });
  }
}
