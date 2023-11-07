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
import { Observable } from "rxjs";

@Component({
  selector: "org-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
})
export class TodoListComponent implements OnInit, OnChanges {
  @Input() todos: Todo[] = [];
  @Input() selectedTodo: Todo | null = null;
  @Output() deleteTodoItem = new EventEmitter<string>();
  @Output() editTodoItem = new EventEmitter<string>();
  @Output() markAsComplete = new EventEmitter<Todo>();
  @Output() pinTodo = new EventEmitter<Todo>();
  @Output() clearcompletedItems = new EventEmitter<any>();

  showLoader: boolean = true;
  noTodosMessage = "No Todos Available";
  filter: "all" | "active" | "completed" = "all";
  isModalVisible: boolean = false;
  todoToDelete: Todo | null = null;

  constructor(
    private todoDataService: DataShareService,
    private todoService: TodoServiceService
  ) {}

  ngOnInit(): void {
    // this.showLoader = true;
  }
  ngOnChanges() {
    if (Array.isArray(this.todos)) {
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

  deleteTodo(todoId: string | undefined) {
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

  getFilteredTodos() {
    return (this.todos || [])
      .slice()
      .sort((a, b) => (a.pin && !b.pin ? -1 : !a.pin && b.pin ? 1 : 0))
      .filter((todo) => {
        return (
          (this.filter === "active" && !todo.complete) ||
          (this.filter === "completed" && todo.complete) ||
          (this.filter !== "active" && this.filter !== "completed")
        );
      });
  }

  setFilter(filter: "all" | "active" | "completed"): void {
    this.filter = filter;
  }
}
