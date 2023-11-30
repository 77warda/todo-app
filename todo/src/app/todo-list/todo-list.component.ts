import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
import { TodoServiceService } from "../todo-service.service";
import { Todo } from "../new-todos/todo.interface";
import { DataShareService } from "../data-share.service";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,
  // ...
} from "@angular/animations";

@Component({
  selector: "org-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
  animations: [
    // trigger("listAnimation", [
    //   transition("* => *", [
    //     // each time the binding value changes
    //     query(":leave", [stagger(100, [animate("2s", style({ opacity: 0 }))])]),
    //     query(":enter", [
    //       style({ opacity: 0 }),
    //       stagger(100, [animate("0.5s", style({ opacity: 1 }))]),
    //     ]),
    //   ]),
    // ]),
    trigger("todoAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(-25px)" }),
        animate(
          "0.6s ease-in-out",
          style({ opacity: 1, transform: "translateY(0)" })
        ),
      ]),
      transition(":leave", [
        style({ opacity: 1 }),
        animate("0.5s ease-out", style({ opacity: 0 })),
      ]),
    ]),

    trigger("filterAnimation", [
      transition("* => completed", [
        style({ opacity: 0, transform: "translateX(-40px)" }),
        animate(
          "0.4s ease-in-out",
          style({ opacity: 1, transform: "translateX(0)" })
        ),
      ]),
      transition("all <=> active", [
        style({ opacity: 0, transform: "translateX(-40px)" }),
        animate(
          "0.4s ease-in-out",
          style({ opacity: 1, transform: "translateX(0)" })
        ),
      ]),
      transition("all <=> completed", [
        style({ opacity: 0, transform: "translateX(-40px)" }),
        animate(
          "0.4s ease-in-out",
          style({ opacity: 1, transform: "translateX(0)" })
        ),
      ]),
    ]),
  ],
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

  toggle() {
    this.filter == "active";
  }
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
