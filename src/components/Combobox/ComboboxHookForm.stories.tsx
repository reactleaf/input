import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import Combobox from "@/components/Combobox/hookform"
import { FormProvider, useForm } from "react-hook-form"

const meta: Meta<typeof Combobox> = {
  title: "Components/Combobox",
  component: Combobox,
}

export default meta

export const HookForm: StoryObj<typeof Combobox> = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    clearable: true,
    options: [{ label: "Option 1" }, { label: "Option 2" }, { label: "Option 3" }],
  },
  argTypes: {
    label: {
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
  parameters: {
    docs: {
      story: {
        height: "200px",
      },
    },
  },
  render: (args) => {
    const form = useForm({ defaultValues: { option: "Option 1" } })
    return (
      <FormProvider {...form}>
        <Combobox {...args} name="option" label="Label" />
      </FormProvider>
    )
  },
}
