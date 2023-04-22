import type { Meta, StoryObj } from "@storybook/react"

import { defaultFalse } from "@/utils/storybook"
import TextInput from "@/components/TextInput"

const meta: Meta<typeof TextInput> = {
  title: "Components/TextInput",
  component: TextInput,
}

export default meta

type Story = StoryObj<typeof TextInput>

export const Default: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    errorMessage: "",
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
    errorMessage: {
      description: "Error message that makes input red if exists",
    },
    onEnter: {
      description: "Special handler for enter key",
    },
  },
}
