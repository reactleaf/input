import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import Combobox from "@/components/Combobox/hookform"
import { FormProvider, useForm } from "react-hook-form"

const meta: Meta<typeof Combobox> = {
  title: "Components/Combobox",
  component: Combobox,
}

export default meta

const sampleOptions = [
  { label: "Option 1", value: "Option 1" },
  { label: "Option 2", value: "Option 2" },
  { label: "Option 3", value: "Option 3" },
]

export const HookForm: StoryObj<typeof Combobox> = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    options: sampleOptions,
  },
  argTypes: {
    name: {
      type: { required: true, name: "string" },
      category: "Required Props",
      description: "field name for hook-form",
      table: { type: { summary: "string" } },
    },
    label: {
      table: { type: { summary: "string" }, category: "Extended Props" },
    },
  },
  render: (args) => {
    const form = useForm({ defaultValues: { option: sampleOptions[0] } })
    return (
      <FormProvider {...form}>
        <Combobox {...args} name="option" label="Label" />
      </FormProvider>
    )
  },
  parameters: {
    docs: {
      story: {
        height: "200px",
      },
    },
  },
}
