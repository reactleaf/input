import React from "react"
import type { Preview } from "@storybook/react"
import { FormProvider, useForm } from "react-hook-form"
import { sourceTransform } from "@/utils/storybook"
import "@/index.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
    },
    docs: { source: { language: "tsx", transform: sourceTransform } },
    options: {
      storySort: {
        order: [
          "Getting Started",
          "Components",
          [
            "Basic",
            ["TextInput", "NumberInput", "PasswordInput", "FileInput"],
            "Calendar",
            "Dropdown",
            ["Combobox", "Autocomplete"],
          ],
        ],
      },
    },
  },
  decorators: [
    (Story) => (
      <EmptyFormProvider>
        <Story />
      </EmptyFormProvider>
    ),
  ],
}

export default preview

function EmptyFormProvider({ children }: { children: React.ReactNode }) {
  const form = useForm()
  return <FormProvider {...form}>{children}</FormProvider>
}
