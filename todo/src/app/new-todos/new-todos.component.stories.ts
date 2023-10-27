import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { NewTodosComponent } from './new-todos.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<NewTodosComponent> = {
  component: NewTodosComponent,
  title: 'NewTodosComponent',
  decorators: [
    applicationConfig({ providers: [importProvidersFrom(HttpClientModule)] }),
  ],
};
export default meta;
type Story = StoryObj<NewTodosComponent>;

export const Primary: Story = {
  args: {},
};

// export const Heading: Story = {
//   args: {},
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     expect(canvas.getByText(/new-todos works!/gi)).toBeTruthy();
//   },
// };
