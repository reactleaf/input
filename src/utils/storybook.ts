import { InputType } from "@storybook/types"

export const defaultFalse: InputType = {
  control: { type: "boolean" },
  defaultValue: false,
  table: { defaultValue: { summary: "false" } },
}
export const defaultTrue: InputType = {
  control: { type: "boolean" },
  defaultValue: true,
  table: { defaultValue: { summary: "true" } },
}
