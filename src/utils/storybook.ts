import { InputType, ArgsStoryFn } from "@storybook/types"
import React from "react"

export const defaultFalse: InputType = {
  type: "boolean",
  table: { defaultValue: { summary: "false" } },
}
export const defaultTrue: InputType = {
  type: "boolean",
  table: { defaultValue: { summary: "true" } },
}

export const sourceTransform: ArgsStoryFn = (args, context) => {
  const component = context.component as React.ComponentType
  const props = Object.entries(context.args)
    .map(([key, value]) => {
      if (typeof value === "function") return `${key}={() => {}}`
      if (typeof value === "string") return `${key}={"${value}"}`
      return `${key}={${value}}`
    })
    .join("\n  ")
  return `<${component?.displayName}\n  ${props} \n/>`
}
