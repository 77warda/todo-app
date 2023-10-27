import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    {
      id: 1,
      name: 'first',
      complete: false,
    },
    {
      id: 2,
      name: 'Second',
      complete: false,
    },
    {
      id: 3,
      name: 'third',
      complete: false,
    },
  ];
  create(createTodoDto: CreateTodoDto) {
    const newTodo: Todo = {
      id: this.todos.length + 1,
      complete: false,
      ...createTodoDto,
    };

    this.todos.push(newTodo);
    return newTodo;
  }

  findAll() {
    return this.todos;
  }

  findOne(id: number) {
    return this.todos.find((todo) => todo.id === id);
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    const todoToUpdate = this.todos.find((todo) => todo.id === id);
    todoToUpdate.complete = !todoToUpdate.complete;
    return todoToUpdate;
  }

  remove(id: number) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }
}
