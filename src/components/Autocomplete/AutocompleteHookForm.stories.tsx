import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import Autocomplete from "@/components/Autocomplete/hookform"
import { FormProvider, useForm } from "react-hook-form"

const meta: Meta<typeof Autocomplete> = {
  title: "Components/Autocomplete",
  component: Autocomplete,
}

export default meta

export const HookForm: StoryObj<typeof Autocomplete> = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    options: [
      { label: "Option 1", value: "Option 1" },
      { label: "Option 2", value: "Option 2" },
      { label: "Option 3", value: "Option 3" },
    ],
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
    const form = useForm({ defaultValues: { option: "Option 1" } })
    return (
      <FormProvider {...form}>
        <Autocomplete {...args} name="option" label="Label" />
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
