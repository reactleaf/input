import React, { useState } from "react"
import Creatable from "react-select/creatable"
import { getStyle } from "./Autocomplete.style"
import { ActionMeta, OnChangeValue } from "react-select"
import cx from "classnames"

export interface Props
  extends Omit<React.ComponentProps<typeof Creatable>, "className" | "classNamePrefix" | "styles" | "isSearchable"> {
  label?: string
  errorMessage?: string
}

export default function Autocomplete({ label, errorMessage, ...props }: Props) {
  function isFilled(value: unknown) {
    if (value instanceof Array) {
      return value.length > 0
    }
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
    setFocused(false)
  }

  return (
    <div
      className={cx("leaf-input-container", "leaf-autocomplete", {
        filled,
        focused,
        error: errorMessage,
        disabled: props.isDisabled,
      })}
    >
      <div className="leaf-label-area">
        <label className="leaf-label">{label}</label>
      </div>
      <Creatable
        {...props}
        className="leaf-input-area"
        classNamePrefix="leaf-autocomplete"
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
