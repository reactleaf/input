import type { Meta, StoryObj } from "@storybook/react"

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
    disabled: false,
    readOnly: false,
  },
  argTypes: {
    label: {
      description: "label for input",
      table: { type: { summary: "string" } },
    },
    placeholder: {
      table: { type: { summary: "string" } },
    },
    clearable: {
      description: "Clear button appears when value is filled",
      defaultValue: { summary: "false" },
      table: { type: { summary: "boolean" } },
    },
    disabled: {
      defaultValue: { summary: "false" },
      table: { type: { summary: "boolean" } },
    },
    readOnly: {
      defaultValue: { summary: "false" },
      table: { type: { summary: "boolean" } },
    },
    formatter: {
      description: "As default, add commas to number",
      defaultValue: { summary: "s => s" },
      table: { type: { summary: "(value: string) => string" } },
    },
    errorMessage: {
      description: "Error message that makes input red if exists",
      table: { type: { summary: "string" } },
    },
    onEnter: {
      description: "Called when enter key is pressed",
      table: { type: { summary: "(value: string) => void" } },
    },
  },
}
