import React from "react"
import TextInputPure, { Props } from "./TextInput"
import { Controller, UseControllerProps } from "react-hook-form"

interface HookFormProps extends Omit<Props, "name" | "defaultValue" | "value" | "errorMessage">, UseControllerProps {}

function TextInput(props: Props) {
  return <TextInputPure {...props} />
}

TextInput.HookForm = (props: HookFormProps) => {
  const { name, rules, defaultValue, control, shouldUnregister, ...inputProps } = props
  const controllerProps = { name, rules, defaultValue, control, shouldUnregister }

  return (
    <Controller
      {...controllerProps}
      render={({ field, fieldState }) => (
        <TextInputPure
          {...inputProps}
          name={field.name}
          value={field.value}
          ref={field.ref}
          onValueChange={(v) => {
            field.onChange(v)
            inputProps.onValueChange?.(v)
          }}
          onBlur={(e) => {
            field.onBlur()
            inputProps.onBlur?.(e)
          }}
          errorMessage={fieldState.error?.message}
        />
      )}
    />
  )
}
;(TextInput.HookForm as React.FunctionComponent).displayName = "TextInput.HookForm"

export default TextInput
export type { Props, HookFormProps }
