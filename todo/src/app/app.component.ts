import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TodoServiceService } from '../app/todo-service.service';
import { Todo } from './new-todos/todo.interface';

@Component({
  selector: 'org-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  allTodos!: Todo[];
  isLoading = false;

  ngOnInit(): void {
    console.log('warda', this.fetchTodos());
    this.todoService.getTodos().subscribe((todos) => {
      this.allTodos = todos;
    });
  }
  constructor(private todoService: TodoServiceService) {}

  addTodo(newTodo: any) {
    console.log('parent', newTodo);
    this.todoService.addTodo(newTodo).subscribe((response) => {
      this.allTodos.push(response);
      this.fetchTodos();
    });
  }

  deleteTodo(todoId: number) {
    this.todoService.deleteTodo(todoId).subscribe(() => {
      this.allTodos = this.allTodos.filter((todo) => todo.id !== todoId);
      this.fetchTodos();
    });
  }
  fetchTodos(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.allTodos = todos;
    });
  }
  markCompleted(todo: Todo) {
    if (todo.id !== undefined) {
      this.todoService.markAsComplete(todo.id, !todo.complete).subscribe(() => {
        todo.complete = !todo.complete;
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
