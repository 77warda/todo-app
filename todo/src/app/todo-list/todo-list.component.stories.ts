import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from "@storybook/angular";
import { TodoListComponent } from "./todo-list.component";

import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { HttpClientModule } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";

const meta: Meta<TodoListComponent> = {
  component: TodoListComponent,
  title: "TodoListComponent",
  decorators: [
    applicationConfig({ providers: [importProvidersFrom(HttpClientModule)] }),
  ],
};
export default meta;
type Story = StoryObj<TodoListComponent>;

export const completed: Story = {
  args: {
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
    ],
  },
};

export const pinned: Story = {
  args: {
    todos: [
      {
        id: 1,
        name: "task 1",
        complete: false,
        pin: true,
      },
      {
        id: 1,
        name: "task 1",
        complete: false,
        pin: true,
      },
    ],
  },
};

export const Primary: Story = {
  args: {},
};

// export const Heading: Story = {
//   args: {},
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     expect(canvas.getByText(/todo-list works!/gi)).toBeTruthy();
//   },
// };
