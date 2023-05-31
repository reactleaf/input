import React from "react"
import { defaultTheme } from "@reactleaf/theme"
import type { Preview } from "@storybook/react"
import { ThemeProvider } from "styled-components"
import { FormProvider, useForm } from "react-hook-form"

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
