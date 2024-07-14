import type { Meta, StoryObj } from "@storybook/react"
import Combobox from "@/components/Combobox"
import { fn } from "@storybook/test"

const meta: Meta<typeof Combobox> = {
  title: "Components/Combobox",
  component: Combobox,
  args: { onChange: fn() },
}

export default meta

export const Basic: StoryObj<typeof Combobox> = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    options: [
      { label: "Option 1", value: "Option 1" },
      { label: "Option 2", value: "Option 2" },
      { label: "Option 3", value: "Option 3" },
    ],
  },
  parameters: {
    docs: {
      story: {
        height: "200px",
      },
    },
  },
}

export const Multi: StoryObj<typeof Combobox> = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    isMulti: true,
    options: [
      { label: "Option 1", value: "Option 1" },
      { label: "Option 2", value: "Option 2" },
      { label: "Option 3", value: "Option 3" },
    ],
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
    label: "Label",
    placeholder: "Placeholder",
    options: [
      { label: "Option 1", value: "Option 1" },
      { label: "Option 2", value: "Option 2" },
      { label: "Option 3", value: "Option 3" },
    ],
    isDisabled: true,
  },
  parameters: {
    docs: {
      story: {
        height: "200px",
      },
    },
  },
}

export const Playground: StoryObj<typeof Combobox> = {
  args: {
    label: "Playground",
    placeholder: "Placeholder",
    isMulti: true,
    options: [
      { value: 1, label: "Option 1" },
      { value: 2, label: "Option 2" },
      { value: 3, label: "Option 3" },
    ],
  },
  argTypes: {
    label: {
      table: { type: { summary: "string" }, category: "Extended Props" },
    },
    errorMessage: {
      description: "Error message that makes input red if exists",
      table: { type: { summary: "string" }, category: "Extended Props" },
    },
  },
}
