import React, { useState } from "react"
import Select, { SelectInstance, ActionMeta, OnChangeValue, Props as SelectProps } from "react-select"
import { getStyle } from "./Combobox.style"
import cx from "classnames"

interface Option {
  label: string
  value: string | number | boolean
}

export interface Props extends Omit<SelectProps<Option, false>, "className" | "classNamePrefix" | "styles"> {
  label?: string
  errorMessage?: string
}

export default React.forwardRef<SelectInstance<Option, false>, Props>(function Combobox(
  { label, errorMessage, ...props }: Props,
  ref
) {
  function isFilled(value: unknown) {
    return value !== "" && value !== null && value !== undefined
  }

  const [filled, setFilled] = useState(isFilled(props.value))
  const [focused, setFocused] = useState(false)

  function handleChange(newValue: OnChangeValue<Option, false>, meta: ActionMeta<Option>) {
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
      <Select<Option, false>
        {...props}
        ref={ref}
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
})
