import type { Meta, StoryObj } from "@storybook/react"

import NumberInput from "@/components/NumberInput"

const meta: Meta<typeof NumberInput> = {
  title: "Components/NumberInput",
  component: NumberInput,
}

export default meta

type Story = StoryObj<typeof NumberInput>

export const HookForm: Story = {
  name: "Example with HookForm",
  args: {
    name: "amount",
    label: "Amount",
    placeholder: "Placeholder",
    clearable: true,
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
    step: {
      description:
        "Increase or decrease value by step, when up or down arrow key is pressed. If shift key is pressed, step is multiplied by 10",
      defaultValue: { summary: 1 },
      table: { type: { summary: "number" }, category: "Extended Props" },
    },
    errorMessage: {
      description: "Error message that makes input red if exists",
      table: { type: { summary: "string" }, category: "Extended Props" },
    },
    formatter: {
      description: "As default, add commas to number",
      defaultValue: { summary: "formatNumber" },
      table: { type: { summary: "(value: number) => string" }, category: "Extended Props" },
    },
    parser: {
      description: "As default, parse only numeric characters",
      defaultValue: { summary: "parseNumber" },
      table: { type: { summary: "(value: string) => number" }, category: "Extended Props" },
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
}
