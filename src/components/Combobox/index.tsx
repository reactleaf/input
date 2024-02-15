import React, { useState } from "react"
import Select, { ActionMeta, OnChangeValue } from "react-select"
import { getStyle } from "./Combobox.style"
import cx from "classnames"
export interface Props extends Omit<React.ComponentProps<typeof Select>, "className" | "classNamePrefix" | "styles"> {
  label?: string
  errorMessage?: string
}

export default function Combobox({ label, errorMessage, ...props }: Props) {
  function isFilled(value: unknown) {
    return value !== "" && value !== null && value !== undefined
  }

  const [filled, setFilled] = useState(isFilled(props.value))
  const [focused, setFocused] = useState(false)

  function handleChange(newValue: OnChangeValue<unknown, false>, meta: ActionMeta<unknown>) {
    props.onChange?.(newValue, meta)
    setFilled(isFilled(newValue))
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    props.onFocus?.(e)
    setFocused(true)
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    props.onBlur?.(e)
    setFilled(isFilled(e.currentTarget.value))
    setFocused(false)
  }

  return (
    <div
      className={cx("leaf-input-container", "leaf-combobox", {
        filled,
        focused,
        error: errorMessage,
        disabled: props.isDisabled,
      })}
    >
      <div className="leaf-label-area">
        <label className="leaf-label">{label}</label>
      </div>
      <Select
        {...props}
        className="leaf-input-area"
        classNamePrefix="leaf-combobox"
        isClearable={props.isClearable ?? true}
        styles={getStyle({ isError: !!errorMessage })}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div className="leaf-extra-area">
        <p className="leaf-error-message leaf-desc">{errorMessage}</p>
      </div>
    </div>
  )
}
