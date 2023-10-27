import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { Todo } from './new-todos/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoServiceService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  deleteTodo(todoId: number): Observable<Todo> {
    return this.http.delete<Todo>(`${this.apiUrl}/${todoId}`);
  }

  markAsComplete(todoId: number, status: boolean): Observable<Todo> {
    return this.http.patch<Todo>(`${this.apiUrl}/${todoId}`, {
      complete: status,
    });
  }
}
