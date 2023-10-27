import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TodoServiceService } from '../todo-service.service';
@Component({
  selector: 'org-new-todos',
  templateUrl: './new-todos.component.html',
  styleUrls: ['./new-todos.component.scss'],
})
export class NewTodosComponent implements OnInit {
  @Output() addTodoItem = new EventEmitter<any>();

  todoForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
  });
  todos: any[] = [];
  data: any;
  isLoading = false;
  filter: 'all' | 'active' | 'completed' = 'all';

  constructor(
    private fb: FormBuilder,
    private todoService: TodoServiceService
  ) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  addTodo() {
    if (this.todoForm.valid) {
      const newTodo = this.todoForm.value;
      this.todoForm.reset();
      this.addTodoItem.emit(newTodo);
    }
  }
}
