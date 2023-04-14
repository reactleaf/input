import React, { useEffect } from "react"
import TextInput, { TextInputProps } from "@/components/TextInput"
import { ThemeProvider } from "styled-components"
import { colorTheme, typoTheme } from "@/styles/defaultTheme"

export default function InputText(props: TextInputProps) {
  const [value, setValue] = React.useState("")
  useEffect(() => setValue(props.value), [props.value])

  return (
    <ThemeProvider theme={{ colors: colorTheme, typo: typoTheme }}>
      <TextInput {...props} value={value} onChange={(e) => setValue(e.target.value)} />
    </ThemeProvider>
  )
}
