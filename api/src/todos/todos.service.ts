import { Injectable } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo } from "./entities/todo.entity";

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    {
      id: 1,
      name: "first",
      complete: false,
      pin: false,
    },
    {
      id: 2,
      name: "Second",
      complete: false,
      pin: false,
    },
    {
      id: 3,
      name: "third",
      complete: false,
      pin: false,
    },
  ];
  create(createTodoDto: CreateTodoDto) {
    const newTodo: Todo = {
      id: this.todos.length + 1,
      complete: false,
      pin: false,
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
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      console.log(`Todo with ID ${id} not found`);
    }

    // Replace the entire todo object with the updated data
    this.todos[index] = {
      ...this.todos[index],
      ...updateTodoDto, // Update with the new data from updateTodoDto
    };

    return this.todos[index];
  }

  remove(id: number) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      // Reset IDs for remaining todos starting from 1
      this.todos.forEach((todo, index) => {
        todo.id = index + 1;
      });
    }
  }
}
