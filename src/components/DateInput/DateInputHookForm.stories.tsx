import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import DateInput from "@/components/DateInput/hookform"
import { FormProvider, useForm } from "react-hook-form"

const meta: Meta<typeof DateInput> = {
  title: "Components/DateInput",
  component: DateInput,
}

export default meta

export const HookForm: StoryObj<typeof DateInput> = {
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
    const form = useForm()
    return (
      <FormProvider {...form}>
        <DateInput {...args} name="date" label="Label" />
      </FormProvider>
    )
  },
}
