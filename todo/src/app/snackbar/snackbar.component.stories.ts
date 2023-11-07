import type { Meta, StoryObj, Story } from "@storybook/angular";
import { SnackbarComponent } from "./snackbar.component";

import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const meta: Meta<SnackbarComponent> = {
  component: SnackbarComponent,
  title: "SnackbarComponent",
};
export default meta;

type StoryArgs = {
  buttonColor: "blue" | "red";
};

export const Primary = {
  args: {
    buttonColor: "blue",
    buttonText: "Reload",
    buttonSize: "small",
  },
};

export const Secondary = {
  args: {
    buttonColor: "green",
    buttonSize: "medium",
  },
};

export const danger = {
  args: {
    buttonColor: "red",
    buttonText: "Ok",
    buttonSize: "large",
  },
};
// export const Heading: Story = {
//   args: {},
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     expect(canvas.getByText(/loader works!/gi)).toBeTruthy();
//   },
// };
