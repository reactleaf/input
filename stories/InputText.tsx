import React, { useEffect } from "react"
import TextInput, { TextInputProps } from "@/components/TextInput"
import { ThemeProvider } from "styled-components"
import { defaultTheme } from "@reactleaf/theme"

export default function InputText(props: TextInputProps) {
  const [value, setValue] = React.useState("")
  useEffect(() => setValue(props.value), [props.value])

  return (
    <ThemeProvider theme={defaultTheme}>
      <TextInput {...props} value={value} onChange={(e) => setValue(e.target.value)} />
    </ThemeProvider>
  )
}
