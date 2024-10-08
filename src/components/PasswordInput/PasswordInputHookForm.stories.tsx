import type { Meta, StoryObj } from "@storybook/react"
import PasswordInput from "@/components/PasswordInput/hookform"

const meta: Meta<typeof PasswordInput> = {
  title: "Components/Basic/PasswordInput",
  component: PasswordInput,
}

export default meta

export const HookForm: StoryObj<typeof PasswordInput> = {
  name: "Example with HookForm",
  args: {
    name: "name",
    label: "Label",
    placeholder: "Placeholder",
    clearable: true,
    disabled: false,
    readOnly: false,
  },
  argTypes: {
    name: {
      type: { required: true, name: "string" },
      description: "field name for hook-form",
      table: { type: { summary: "string" } },
    },
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
    onValueChange: {
      action: "onValueChange",
      description: "Called when value is changed",
      table: { type: { summary: "(value: string) => void" } },
    },
    onEnter: {
      description: "Called when enter key is pressed",
      table: { type: { summary: "(value: string) => void" } },
    },
  },
}
