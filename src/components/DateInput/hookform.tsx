"use client"

import React from "react"
import PureDateInput, { Props } from "."
import { Controller, UseControllerProps } from "react-hook-form"

interface HookFormProps
  extends Omit<Props, "name" | "defaultValue" | "value" | "errorMessage" | "onChange">,
    UseControllerProps {
  onChange?: Props["onChange"]
}

export default function DateInput(props: HookFormProps) {
  const { name, rules, defaultValue, control, shouldUnregister, ...inputProps } = props
  const controllerProps: UseControllerProps = { name, rules, defaultValue, shouldUnregister }
  if (control) {
    controllerProps.control = control
  }

  return (
    <Controller
      {...controllerProps}
      render={({ field, fieldState }) => (
        <PureDateInput
          {...inputProps}
          name={field.name}
          selected={field.value}
          onChange={(date, e) => {
            field.onChange(date)
            inputProps.onChange?.(date, e)
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
