import type { Meta, StoryObj } from "@storybook/react"

import NumberInput, { formatNumberWithCommas } from "@/components/NumberInput"

const meta: Meta<typeof NumberInput> = {
  title: "Components/NumberInput",
  component: NumberInput,
}

export default meta

type Story = StoryObj<typeof NumberInput>

export const Basic: Story = {
  args: {
    label: "Label",
    placeholder: "Put some numbers",
    clearable: true,
  },
}

export const Formatter: Story = {
  args: {
    label: "Using comma-separate formatter",
    placeholder: "$ xxx,xxx,xxx",
    clearable: true,
    min: -999_999_999,
    max: 999_999_999,
    step: 100,
    formatter: (value) => (value ? `$ ${formatNumberWithCommas(value)}` : "$ "),
  },
}

export const Disabled: Story = {
  args: {
    label: "Disabled",
    placeholder: "Put some numbers",
    disabled: true,
  },
}

export const Playground: Story = {
  args: {
    label: "Amount",
    placeholder: "Placeholder",
    clearable: true,
    min: -999_999_999,
    max: 999_999_999,
    step: 100,
    formatter: (value) => (value ? `$ ${formatNumberWithCommas(value)}` : "$ "),
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
