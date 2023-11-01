import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { TodoServiceService } from "../todo-service.service";
import { Todo } from "../new-todos/todo.interface";
import { DataShareService } from "../data-share.service";

@Component({
  selector: "org-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];
  @Input() selectedTodo: Todo | null = null;
  @Output() deleteTodoItem = new EventEmitter<number>();
  @Output() editTodoItem = new EventEmitter<number>();
  @Output() markAsComplete = new EventEmitter<Todo>();
  @Output() pinTodo = new EventEmitter<Todo>();
  @Output() clearcompletedItems = new EventEmitter<any>();

  isLoading = false;
  filter: "all" | "active" | "completed" = "all";
  isModalVisible: boolean = false;
  todoToDelete: Todo | null = null;

  constructor(
    private todoDataService: DataShareService,
    private todoService: TodoServiceService
  ) {}
  ngOnInit(): void {
    // this.todoService.getTodos().subscribe((todos: Todo[]) => {
    //   this.todos = todos;
    // });
  }
  showModal(todo: Todo) {
    this.todoToDelete = todo;
    this.isModalVisible = true;
  }

  hideModal() {
    this.isModalVisible = false;
  }

  confirmDelete() {
    if (this.todoToDelete) {
      this.deleteTodoItem.emit(this.todoToDelete.id);
      this.hideModal();
    }
  }

  editTodo(todo: any) {
    this.todoDataService.setTodo(todo);
  }

  deleteTodo(todoId: number | undefined) {
    console.log("child", todoId);
    this.deleteTodoItem.emit(todoId);
  }

  markCompleted(todo: Todo) {
    this.markAsComplete.emit(todo);
  }

  pinnedTodo(todo: Todo) {
    this.pinTodo.emit(todo);
  }

  clearCompleted() {
    this.clearcompletedItems.emit();
  }

  // getFilteredTodos(): any[] {
  //   if (this.filter === "active") {
  //     return this.todos.filter((todo) => !todo.complete);
  //   } else if (this.filter === "completed") {
  //     return this.todos.filter((todo) => todo.complete);
  //   } else {
  //     return this.todos;
  //   }
  // }

  getFilteredTodos(): any[] {
    const sortedTodos = this.todos.slice().sort((a, b) => {
      if (a.pin && !b.pin) {
        return -1;
      } else if (!a.pin && b.pin) {
        return 1;
      } else {
        return 0;
      }
    });

    if (this.filter === "active") {
      return sortedTodos.filter((todo) => !todo.complete);
    } else if (this.filter === "completed") {
      return sortedTodos.filter((todo) => todo.complete);
    } else {
      return sortedTodos;
    }
  }

  setFilter(filter: "all" | "active" | "completed"): void {
    this.filter = filter;
  }
}
