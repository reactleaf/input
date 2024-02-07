"use client"

import React from "react"
import PureCombobox, { Props } from "."
import { Controller, UseControllerProps } from "react-hook-form"

interface HookFormProps<Option>
  extends Omit<Props<Option>, "name" | "defaultValue" | "value" | "errorMessage">,
    UseControllerProps {}

export default function Combobox<Option extends { label: string }>(props: HookFormProps<Option>) {
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
          onComplete={(v) => {
            field.onChange(v?.label)
            inputProps.onComplete?.(v)
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
