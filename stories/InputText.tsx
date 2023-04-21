import React, { useEffect } from "react"
import TextInput, { TextInputProps } from "@/components/TextInput"

export default function InputText(props: TextInputProps) {
  const [value, setValue] = React.useState<string>()
  useEffect(() => setValue(props.value), [props.value])

  return <TextInput value={value} onChange={(e) => setValue(e.target.value)} {...props} />
}
