import type { Meta, StoryObj } from "@storybook/react"

import InputText from "./InputText"
import { defaultFalse } from "@/utils/storybook"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InputText> = {
  title: "Example/Input.Text",
  component: InputText,
}

export default meta

type Story = StoryObj<typeof InputText>

export const Default: Story = {
  args: {
    value: "",
    label: "Label",
    placeholder: "Placeholder",
    clearable: true,
  },
  argTypes: {
    placeholder: {
      table: { type: { summary: "string" } },
    },
    clearable: defaultFalse,
    formatter: {
      description: "Format string right before onChange called",
    },
    onEnter: {
      description: "Special handler for enter key",
    },
  },
}
