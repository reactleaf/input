import React from "react"
import { defaultTheme } from "@reactleaf/theme"
import type { Preview } from "@storybook/react"
import { ThemeProvider } from "styled-components"
import { FormProvider, useForm } from "react-hook-form"
import { sourceTransform } from "@/utils/storybook"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
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
        order: ["Getting Started", "Components", ["TextInput", "NumberInput", "FileInput"]],
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={defaultTheme}>
        <EmptyFormProvider>
          <Story />
        </EmptyFormProvider>
      </ThemeProvider>
    ),
  ],
}

export default preview

function EmptyFormProvider({ children }: { children: React.ReactNode }) {
  const form = useForm()
  return <FormProvider {...form}>{children}</FormProvider>
}
