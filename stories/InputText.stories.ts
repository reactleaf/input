import type { Meta, StoryObj } from "@storybook/react"

import InputText from "./InputText"
import { defaultFalse, defaultTrue } from "@/utils/storybook"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Example/Input.Text",
  component: InputText,
} satisfies Meta<typeof InputText>

export default meta

type Story = StoryObj<typeof InputText>

export const Default: Story = {
  args: { value: "", label: "Label", placeholder: "Placeholder", type: "text", clearable: true },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "tel", "url"],
      defaultValue: "text",
      table: { defaultValue: { summary: "text" } }, // Table에서 렌더링될 기본값
    },
    readOnly: defaultFalse,
    disabled: defaultFalse,
    clearable: defaultTrue,
    autoComplete: {
      description: "See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete",
    },
    formatter: {
      description: "Format string right before onChange called",
    },
    onEnter: {
      description: "Special handler for enter key",
    },
  },
}
