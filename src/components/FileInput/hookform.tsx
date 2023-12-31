import React from "react"
import { Controller, UseControllerProps } from "react-hook-form"
import FileInputPure, { Props } from "."

interface HookFormProps extends Omit<Props, "name" | "defaultValue" | "value" | "errorMessage">, UseControllerProps {}

export default function FileInput(props: HookFormProps) {
  const { name, rules, defaultValue, control, shouldUnregister, ...inputProps } = props
  const controllerProps: UseControllerProps = { name, rules, defaultValue, shouldUnregister }
  if (control) {
    controllerProps.control = control
  }

  return (
    <Controller
      {...controllerProps}
      render={({ field, fieldState }) => (
        <FileInputPure
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

export type { Props, HookFormProps }
