import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import Autocomplete from "@/components/Autocomplete"

const meta: Meta<typeof Autocomplete> = {
  title: "Components/Autocomplete",
  component: Autocomplete,
}

export default meta

export const Basic: StoryObj<typeof Autocomplete> = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    options: [
      { label: "Option 1", value: "Option 1" },
      { label: "Option 2", value: "Option 2" },
      { label: "Option 3", value: "Option 3" },
    ],
  },
  parameters: {
    docs: {
      story: {
        height: "200px",
      },
    },
  },
}

export const Multi: StoryObj<typeof Autocomplete> = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    isMulti: true,
    options: [
      { label: "Option 1", value: "Option 1" },
      { label: "Option 2", value: "Option 2" },
      { label: "Option 3", value: "Option 3" },
    ],
    formatCreateLabel: (inputValue: string) => (
      <>
        Add Option : <b>{inputValue}</b>
      </>
    ),
  },
  parameters: {
    docs: {
      story: {
        height: "200px",
      },
    },
  },
}

export const Disabled: StoryObj<typeof Autocomplete> = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    options: [
      { label: "Option 1", value: "Option 1" },
      { label: "Option 2", value: "Option 2" },
      { label: "Option 3", value: "Option 3" },
    ],
    isDisabled: true,
  },
  parameters: {
    docs: {
      story: {
        height: "200px",
      },
    },
  },
}

export const Playground: StoryObj<typeof Autocomplete> = {
  args: {
    label: "Playground",
    placeholder: "Placeholder",
    options: [{ label: "Option 1" }, { label: "Option 2" }, { label: "Option 3" }],
  },
  argTypes: {
    label: {
      table: { type: { summary: "string" }, category: "Extended Props" },
    },
    errorMessage: {
      description: "Error message that makes input red if exists",
      table: { type: { summary: "string" }, category: "Extended Props" },
    },
  },
}
