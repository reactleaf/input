"use client"

import React from "react"
import { Controller, UseControllerProps } from "react-hook-form"
import NumberInputPure, { Props } from "."

interface HookFormProps extends Omit<Props, "name" | "defaultValue" | "value" | "errorMessage">, UseControllerProps {}

export default function NumberInput(props: HookFormProps) {
  const { name, rules, defaultValue, control, shouldUnregister, ...inputProps } = props
  const controllerProps = { name, rules, defaultValue, control, shouldUnregister }

  return (
    <Controller
      {...controllerProps}
      render={({ field, fieldState }) => (
        <NumberInputPure
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

export type { HookFormProps }
export { formatNumber, formatNumberWithCommas } from "./formatter"
