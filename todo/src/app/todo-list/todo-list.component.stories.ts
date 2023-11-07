import {
  applicationConfig,
  moduleMetadata,
  type Meta,
  type StoryObj,
  componentWrapperDecorator,
} from "@storybook/angular";
import { LoaderComponent } from "../loader/loader.component";

import { TodoListComponent } from "./todo-list.component";

import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { HttpClientModule } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { Todo } from "../new-todos/todo.interface";

const meta: Meta<TodoListComponent> = {
  component: TodoListComponent,
  title: "TodoListComponent",
  decorators: [
    componentWrapperDecorator((story) => `<div>${story}</div>`),
    applicationConfig({ providers: [importProvidersFrom(HttpClientModule)] }),
    moduleMetadata({ declarations: [LoaderComponent, TodoListComponent] }),
  ],
};
export default meta;
type Story = StoryObj<TodoListComponent>;
export const Default = {
  args: {
    showLoader: false,

    todos: [
      {
        id: 1,
        name: "task 1",
        complete: false,
        pin: false,
      },
      {
        id: 2,
        name: "task 2",
        complete: false,
        pin: false,
      },
      {
        id: 3,
        name: "task 3",
        complete: false,
        pin: false,
      },
      {
        id: 4,
        name: "task 4",
        complete: false,
        pin: false,
      },
      {
        id: 5,
        name: "task 5",
        complete: false,
        pin: false,
      },
      {
        id: 6,
        name: "task 6",
        complete: false,
        pin: false,
      },
      {
        id: 7,
        name: "task 7",
        complete: false,
        pin: false,
      },
      {
        id: 8,
        name: "task 8",
        complete: false,
        pin: false,
      },
      {
        id: 9,
        name: "task 9",
        complete: false,
        pin: false,
      },
      {
        id: 10,
        name: "task 10",
        complete: false,
        pin: false,
      },
      {
        id: 11,
        name: "task 11",
        complete: false,
        pin: false,
      },
      {
        id: 12,
        name: "task 12",
        complete: false,
        pin: false,
      },
      {
        id: 13,
        name: "task 13",
        complete: false,
        pin: false,
      },
      {
        id: 14,
        name: "Complete homework assignment",
        complete: false,
        pin: false,
      },
      {
        id: 15,
        name: "Prepare for upcoming exam",
        complete: false,
        pin: false,
      },
      {
        id: 16,
        name: "Read a chapter from a book",
        complete: false,
        pin: false,
      },
      {
        id: 17,
        name: "Go for a morning jog",
        complete: false,
        pin: false,
      },
      {
        id: 18,
        name: "Practice playing the guitar",
        complete: false,
        pin: false,
      },
      {
        id: 19,
        name: "Write a short story",
        complete: false,
        pin: false,
      },
      {
        id: 20,
        name: "Learn a new recipe and cook dinner",
        complete: false,
        pin: false,
      },
    ],
  },
};
export const completed: Story = {
  args: {
    showLoader: false,
    todos: [
      {
        id: 1,
        name: "task 1",
        complete: true,
        pin: false,
      },
      {
        id: 1,
        name: "task 1",
        complete: true,
        pin: false,
      },
      ...Default.args.todos.slice(0, 3),
    ],
  },
};

export const pinned: Story = {
  args: {
    showLoader: false,
    todos: [
      {
        id: 1,
        name: "task 1",
        complete: false,
        pin: true,
      },
      {
        id: 1,
        name: "task 2",
        complete: false,
        pin: true,
      },
      ...Default.args.todos.slice(2, 6),
    ],
  },
};

export const emptyState: Story = {
  args: {
    showLoader: false,
    todos: [],
  },
};

export const loading = {
  args: {
    showLoader: true,
    todos: false,
  },
};
