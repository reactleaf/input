import type { Meta, StoryObj } from "@storybook/react"
import TextInput from "@/components/TextInput"

const meta: Meta<typeof TextInput> = {
  title: "Components/TextInput",
  component: TextInput,
}

export default meta

export const Basic: StoryObj<typeof TextInput> = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    clearable: true,
    disabled: false,
    readOnly: false,
  },
}

export const Disabled: StoryObj<typeof TextInput> = {
  args: {
    label: "Disabled",
    placeholder: "Placeholder",
    disabled: true,
  },
}

export const Playground: StoryObj<typeof TextInput> = {
  args: {
    label: "Playground",
    placeholder: "Placeholder",
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
    errorMessage: {
      description: "Error message that makes input red if exists",
      table: { type: { summary: "string" } },
    },
    formatter: {
      description: "As default, add commas to number",
      defaultValue: { summary: "s => s" },
      table: { type: { summary: "(value: string) => string" } },
    },
    onValueChange: {
      action: "onValueChange",
      description: "Called when value is changed",
      table: { type: { summary: "(value: string) => void" } },
    },
    onEnter: {
      action: "onEnter",
      description: "Called when enter key is pressed",
      table: { type: { summary: "(value: string) => void" } },
    },
  },
}
