import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { TodoListComponent } from './todo-list.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<TodoListComponent> = {
  component: TodoListComponent,
  title: 'TodoListComponent',
  decorators: [
    applicationConfig({ providers: [importProvidersFrom(HttpClientModule)] }),
  ],
};
export default meta;
type Story = StoryObj<TodoListComponent>;

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
