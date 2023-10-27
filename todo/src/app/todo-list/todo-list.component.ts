import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TodoServiceService } from '../todo-service.service';
import { Todo } from '../new-todos/todo.interface';

@Component({
  selector: 'org-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];
  @Output() deleteTodoItem = new EventEmitter<number>();
  @Output() markAsComplete = new EventEmitter<Todo>();
  @Output() clearcompletedItems = new EventEmitter<any>();

  isLoading = false;
  filter: 'all' | 'active' | 'completed' = 'all';
  constructor(private todoService: TodoServiceService) {}

  ngOnInit(): void {
    console.log('child todos', this.todos);
    this.fetchTodos();
  }

  fetchTodos() {
    this.todoService.getTodos().subscribe((response) => {
      this.todos = response.map((todo) => ({ ...todo, isLoading: true }));
      this.isLoading = true;

      setTimeout(() => {
        this.todos.forEach((todo) => (todo.isLoading = false));
        this.isLoading = false; // Set isLoading to false once data is loaded
      }, 2000);
    });
  }

  deleteTodo(todoId: number | undefined) {
    this.deleteTodoItem.emit(todoId);
  }

  markCompleted(todo: Todo) {
    this.markAsComplete.emit(todo);
  }

  clearCompleted() {
    this.clearcompletedItems.emit();
  }

  getFilteredTodos(): any[] {
    if (this.filter === 'active') {
      return this.todos.filter((todo) => !todo.complete);
    } else if (this.filter === 'completed') {
      return this.todos.filter((todo) => todo.complete);
    } else {
      return this.todos;
    }
  }

  setFilter(filter: 'all' | 'active' | 'completed'): void {
    this.filter = filter;
  }
}
