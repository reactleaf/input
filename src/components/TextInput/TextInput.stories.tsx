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
      table: { type: { summary: "string" }, category: "Extended Props" },
    },
    errorMessage: {
      description: "Error message that makes input red if exists",
      table: { type: { summary: "string" }, category: "Extended Props" },
    },
    clearable: {
      description: "Clear button appears when value is filled",
      defaultValue: { summary: "false" },
      table: { type: { summary: "boolean" }, category: "Extended Props" },
    },
    onValueChange: {
      action: "onValueChange",
      description: "Called when value is changed",
      table: { type: { summary: "(value: string) => void" }, category: "events" },
    },
    onEnter: {
      action: "onEnter",
      description: "Called when enter key is pressed",
      table: { type: { summary: "(value: string) => void" }, category: "events" },
    },
  },
}
