import { Injectable } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo } from "./entities/todo.entity";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    {
      id: uuidv4(),
      name: "first",
      complete: false,
      pin: false,
    },
    {
      id: uuidv4(),
      name: "Second",
      complete: false,
      pin: false,
    },
    {
      id: uuidv4(),
      name: "third",
      complete: false,
      pin: false,
    },
  ];
  create(createTodoDto: CreateTodoDto) {
    const newTodo: Todo = {
      id: uuidv4(),
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

  findOne(id: string) {
    return this.todos.find((todo) => todo.id === id);
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      console.log(`Todo with ID ${id} not found`);
    }

    this.todos[index] = {
      ...this.todos[index],
      ...updateTodoDto,
    };

    return this.todos[index];
  }

  remove(id: string) {
    // const index = this.todos.findIndex((todo) => todo.id === id);
    // if (index !== -1) {
    //   this.todos.splice(index, 1);
    //   this.todos.forEach((todo, index) => {
    //     todo.id = index + 1;
    //   });
    // }
    this.todos = this.todos.filter((x) => x.id !== id);
  }
}
