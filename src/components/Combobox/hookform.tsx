"use client"

import React from "react"
import PureCombobox, { Props } from "."
import { Controller, UseControllerProps } from "react-hook-form"

interface HookFormProps extends Omit<Props, "name" | "defaultValue" | "value" | "errorMessage">, UseControllerProps {}

export default function Combobox(props: HookFormProps) {
  const { name, rules, defaultValue, control, shouldUnregister, ...inputProps } = props
  const controllerProps: UseControllerProps = { name, rules, defaultValue, shouldUnregister }
  if (control) {
    controllerProps.control = control
  }

  return (
    <Controller
      {...controllerProps}
      render={({ field, fieldState }) => (
        <PureCombobox
          {...inputProps}
          name={field.name}
          value={field.value}
          ref={field.ref}
          options={inputProps.options}
          onChange={(v, meta) => {
            field.onChange(v)
            inputProps.onChange?.(v, meta)
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

export type { HookFormProps }
