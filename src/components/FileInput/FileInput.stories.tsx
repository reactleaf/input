import React from "react"
import type { Meta, StoryObj } from "@storybook/react"

import FileInput from "@/components/FileInput"
import { FileSource } from "./types"

const meta: Meta<typeof FileInput> = {
  title: "Components/Basic/FileInput",
  component: FileInput,
}

export default meta

type Story = StoryObj<typeof FileInput>

export const Basic: Story = {
  args: {
    label: "Label",
    maxFileSize: 10 * 1000 * 1000,
  },
  render: (args) => {
    const [value, setValue] = React.useState<FileSource>()
    return <FileInput {...args} value={value} onValueChange={setValue} />
  },
}

export const Disabled: Story = {
  args: {
    label: "Label",
    maxFileSize: 10 * 1000 * 1000,
    disabled: true,
    value: { type: "url", url: "https://picsum.photos/200/300" },
  },
}

export const Playground: Story = {
  args: {
    label: "Image",
    errorMessage: "",
    disabled: false,
    readOnly: false,
    maxFileSize: 10 * 1000 * 1000,
  },
  render: (args) => {
    const [value, setValue] = React.useState<FileSource>()
    return <FileInput {...args} value={value} onValueChange={setValue} />
  },
  argTypes: {
    label: {
      description: "label for input",
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
    maxFileSize: {
      description: "Maximum file size in bytes, 0 or undefined means unlimited",
      table: { type: { summary: "number" } },
    },
    errorMessage: {
      description: "Error message that makes input red if exists",
      table: { type: { summary: "string" } },
    },

    onValueChange: {
      description: "Called when value is changed. ",
      table: { type: { summary: "(value: FileSource) => void" } },
    },
    renderPreview: {
      description: "Custom preview renderer",
      table: { type: { summary: "(value?: FileSource) => ReactNode" } },
    },
  },
}
