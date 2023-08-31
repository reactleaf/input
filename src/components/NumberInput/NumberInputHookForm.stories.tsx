import React, { useEffect } from "react"
import type { Meta, StoryObj } from "@storybook/react"

import NumberInput from "@/components/NumberInput"
import { FormProvider, useForm } from "react-hook-form"

const meta: Meta<typeof NumberInput> = {
  title: "Components/NumberInput",
  component: NumberInput,
}

export default meta

type Story = StoryObj<typeof NumberInput.HookForm>

export const HookForm: Story = {
  name: "Example with HookForm",
  args: {
    name: "amount",
    label: "Amount",
    placeholder: "Placeholder",
    clearable: true,
    commas: true,
    prefix: "$",
  },
  argTypes: {
    name: {
      type: { required: true, name: "string" },
      description: "field name for hook-form",
      table: { type: { summary: "string" } },
    },
    placeholder: {
      table: { type: { summary: "string" } },
    },
    label: {
      table: { type: { summary: "string" }, category: "Extended Props" },
    },
    clearable: {
      description: "Clear button appears when value is filled",
      defaultValue: { summary: "false" },
      table: { type: { summary: "boolean" }, category: "Extended Props" },
    },
    step: {
      description:
        "Increase or decrease value by step, when up or down arrow key is pressed. If shift key is pressed, step is multiplied by 10",
      defaultValue: { summary: 1 },
      table: { type: { summary: "number" } },
    },
    prefix: {
      table: { type: { summary: "string" }, category: "Extended Props" },
    },
    commas: {
      description: "Add commas on thousands separator",
      defaultValue: { summary: false },
      table: { type: { summary: "boolean" }, category: "Extended Props" },
    },
    onValueChange: {
      description: "Called when value is changed. ",
      table: { type: { summary: "(value: number) => void" }, category: "Events" },
    },
    onEnter: {
      description: "Called when enter key is pressed",
      table: { type: { summary: "(value: number) => void" }, category: "Events" },
    },
  },
  render: (args) => {
    const form = useForm({ defaultValues: { amount: 12345.6 } })
    return (
      <FormProvider {...form}>
        <NumberInput.HookForm {...args} name="amount" />
      </FormProvider>
    )
  },
}
