import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { TodoServiceService } from "../todo-service.service";
import { Todo } from "../new-todos/todo.interface";
import { DataShareService } from "../data-share.service";

@Component({
  selector: "org-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
})
export class TodoListComponent implements OnInit, OnChanges {
  @Input() todos: Todo[] = [];
  @Input() selectedTodo: Todo | null = null;
  @Output() deleteTodoItem = new EventEmitter<number>();
  @Output() editTodoItem = new EventEmitter<number>();
  @Output() markAsComplete = new EventEmitter<Todo>();
  @Output() pinTodo = new EventEmitter<Todo>();
  @Output() clearcompletedItems = new EventEmitter<any>();

  @Input() showLoader: boolean = true;
  noTodosMessage = "No Todos Available";
  filter: "all" | "active" | "completed" = "all";
  isModalVisible: boolean = false;
  todoToDelete: Todo | null = null;

  constructor(
    private todoDataService: DataShareService,
    private todoService: TodoServiceService
  ) {}

  ngOnInit(): void {
    this.showLoader = true;
  }
  ngOnChanges() {
    if ((this.todos && this.todos.length > 0) || this.todos.length === 0) {
      this.showLoader = false;
    }
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
