import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import DateInput from "@/components/DateInput"

const meta: Meta<typeof DateInput> = {
  title: "Components/DateInput",
  component: DateInput,
}

export default meta

export const Basic: StoryObj<typeof DateInput> = {
  args: {
    label: "Label",
    placeholderText: "Placeholder",
  },
  parameters: {
    docs: {
      story: {
        height: "360px",
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null)
    return <DateInput {...args} selected={value} onChange={setValue} />
  },
}

export const Formatted: StoryObj<typeof DateInput> = {
  args: {
    label: "Label",
    placeholderText: "Placeholder",
    dateFormat: "yyyy-MM-dd",
  },
  parameters: {
    docs: {
      story: {
        height: "360px",
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null)
    return <DateInput {...args} selected={value} onChange={setValue} />
  },
}

export const Disabled: StoryObj<typeof DateInput> = {
  args: {
    label: "Label",
    placeholderText: "Placeholder",
    dateFormat: "yyyy-MM-dd",
    disabled: true,
  },
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null)
    return <DateInput {...args} selected={value} onChange={setValue} />
  },
}

export const Playground: StoryObj<typeof DateInput> = {
  name: "withPortal, withTime",
  args: {
    label: "Label",
    placeholderText: "Placeholder",
    dateFormat: "yyyy-MM-dd HH:mm",
    showTimeSelect: true,
    withPortal: true,
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
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null)
    return <DateInput {...args} selected={value} onChange={setValue} />
  },
}
