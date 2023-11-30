import {
  Component,
  HostBinding,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { TodoServiceService } from "../todo-service.service";
import { DataShareService } from "../data-share.service";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from "@angular/animations";
import { Subscription } from "rxjs";
import { Todo } from "./todo.interface";
@Component({
  selector: "org-new-todos",
  templateUrl: "./new-todos.component.html",
  styleUrls: ["./new-todos.component.scss"],
  // animations: [
  //   trigger("openClose", [
  //     // ...
  //     state(
  //       "open",
  //       style({
  //         height: "200px",
  //         opacity: 1,
  //         backgroundColor: "yellow",
  //       })
  //     ),
  //     state(
  //       "closed",
  //       style({
  //         height: "100px",
  //         opacity: 0.8,
  //         backgroundColor: "blue",
  //       })
  //     ),
  //     transition("open => closed", [animate("2s")]),
  //     transition("closed => open", [animate("0.5s")]),
  //   ]),
  // ],
  animations: [
    trigger("openClose", [
      state("open", style({ opacity: 1 })),
      state("closed", style({ opacity: 0 })),
      transition("open => closed", animate("1s ease-in-out")),
      transition("closed => open", animate("1s ease-in-out")),
    ]),
  ],
})
export class NewTodosComponent implements OnInit {
  @Input() selectedTodo: Todo | null = null;
  @Output() addTodoItem = new EventEmitter<any>();
  selectedSubscription: Subscription;
  @Output() todoUpdated = new EventEmitter<Todo>();
  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }
  constructor(
    private fb: FormBuilder,
    private todoEditService: DataShareService
  ) {
    this.selectedSubscription = this.todoEditService.selectedTodo$.subscribe(
      (selectedTodo) => {
        this.selectedTodo = selectedTodo;
        this.todoForm.patchValue({
          name: selectedTodo ? selectedTodo.name : "",
        });
      }
    );
  }

  todoForm: FormGroup = this.fb.group({
    name: ["", Validators.required],
  });
  todos: any[] = [];

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      name: ["", Validators.required],
    });
  }

  onSubmit() {
    if (this.todoForm.valid) {
      const newTodo = this.todoForm.value;
      this.todoUpdated.emit(newTodo);
      this.todoForm.reset();
    }
  }
  ngOnDestroy() {
    this.selectedSubscription.unsubscribe();
  }
}
