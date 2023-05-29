import type { Meta, StoryObj } from "@storybook/react"

import FileInput from "@/components/FileInput"

const meta: Meta<typeof FileInput> = {
  title: "Components/FileInput",
  component: FileInput,
}

export default meta

type Story = StoryObj<typeof FileInput>

export const Default: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    errorMessage: "",
    disabled: false,
    readOnly: false,
    maxFileSize: 10 * 1000 * 1000,
    step: 1,
    onChange: console.log,
    onValueChange: console.log,
  },
  argTypes: {
    label: {
      description: "label for input",
      table: { type: { summary: "string" } },
    },
    placeholder: {
      table: { type: { summary: "string" } },
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
      description: "Called when value is changed. ",
      table: { type: { summary: "(value: FileSource) => void" } },
    },
    maxFileSize: {
      description: "Maximum file size in bytes, 0 or undefined means unlimited",
      table: { type: { summary: "number" } },
    },
    errorMessage: {
      description: "Error message that makes input red if exists",
      table: { type: { summary: "string" } },
    },
  },
}
