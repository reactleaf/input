import type { Meta, StoryObj } from "@storybook/react"
import Combobox from "@/components/Combobox"

const meta: Meta<typeof Combobox> = {
  title: "Components/Combobox",
  component: Combobox,
}

export default meta

export const Basic: StoryObj<typeof Combobox> = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    clearable: true,
    options: [{ label: "Option 1" }, { label: "Option 2" }, { label: "Option 3" }],
  },
  parameters: {
    docs: {
      story: {
        height: "200px",
      },
    },
  },
}

export const Disabled: StoryObj<typeof Combobox> = {
  args: {
    label: "Disabled",
    placeholder: "Placeholder",
    disabled: true,
    options: [{ label: "Option 1" }, { label: "Option 2" }, { label: "Option 3" }],
  },
}

export const Playground: StoryObj<typeof Combobox> = {
  args: {
    label: "Playground",
    placeholder: "Placeholder",
    clearable: true,
    options: [{ label: "Option 1" }, { label: "Option 2" }, { label: "Option 3" }],
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
    onComplete: {
      action: "onComplete",
      description: "Called when some option is selected",
      table: { type: { summary: "(value: Option) => void" }, category: "Extended Props" },
    },
    options: {
      required: true,
      description: "Whole listup for options",
      table: { type: { summary: "Option[]" }, category: "Extended Props" },
    },
  },
}
