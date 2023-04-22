import type { Meta, StoryObj } from "@storybook/react"

import NumberInput from "@/components/NumberInput"

const meta: Meta<typeof NumberInput> = {
  title: "Components/NumberInput",
  component: NumberInput,
}

export default meta

type Story = StoryObj<typeof NumberInput>

export const Default: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    errorMessage: "",
    clearable: false,
    disabled: false,
    readOnly: false,
    step: 1,
  },
  argTypes: {
    label: {
      description: "label for input",
      table: { type: { summary: "string" } },
    },
    placeholder: {
      table: { type: { summary: "string" } },
    },
    clearable: {
      description: "Clear button appears when value is filled",
      defaultValue: { summary: "false" },
      table: { type: { summary: "boolean" } },
    },
    disabled: {
      defaultValue: { summary: "false" },
      table: { type: { summary: "boolean" } },
    },
    readOnly: {
      defaultValue: { summary: "false" },
      table: { type: { summary: "boolean" } },
    },
    step: {
      description:
        "Increase or decrease value by step, when up or down arrow key is pressed. If shift key is pressed, step is multiplied by 10",
      defaultValue: { summary: 1 },
      table: { type: { summary: "number" } },
    },
    errorMessage: {
      description: "Error message that makes input red if exists",
      table: { type: { summary: "string" } },
    },
    formatter: {
      description: "As default, add commas to number",
      defaultValue: { summary: "formatNumber" },
      table: { type: { summary: "(value: number) => string" } },
    },
    parser: {
      description: "As default, parse only numeric characters",
      defaultValue: { summary: "parseNumber" },
      table: { type: { summary: "(value: string) => number" } },
    },
    onValueChange: {
      description: "Called when value is changed. ",
      table: { type: { summary: "(value: number) => void" } },
    },
    onEnter: {
      description: "Called when enter key is pressed",
      table: { type: { summary: "(value: number) => void" } },
    },
  },
}

export const Formatter: Story = {
  args: {
    label: "Comma separated number",
    placeholder: "XXX,XXX,XXX",
    errorMessage: "",
    clearable: true,
    disabled: false,
    readOnly: false,
    min: -9999999,
    step: 100,
    formatter: (value) => (value ? value.toLocaleString() : ""),
  },
}
