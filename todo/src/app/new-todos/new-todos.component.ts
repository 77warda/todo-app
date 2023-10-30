import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { TodoServiceService } from "../todo-service.service";
import { DataShareService } from "../data-share.service";
import { Subscription } from "rxjs";
import { Todo } from "./todo.interface";
@Component({
  selector: "org-new-todos",
  templateUrl: "./new-todos.component.html",
  styleUrls: ["./new-todos.component.scss"],
})
export class NewTodosComponent implements OnInit {
  @Input() selectedTodo: Todo | null = null;
  @Output() addTodoItem = new EventEmitter<any>();
  selectedSubscription: Subscription;
  @Output() todoUpdated = new EventEmitter<Todo>();

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

  // addTodo() {
  //   if (this.todoForm.valid) {
  //     const newTodo = this.todoForm.value;
  //     this.todoForm.reset();
  //     this.addTodoItem.emit(newTodo);
  //   }
  // }

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
