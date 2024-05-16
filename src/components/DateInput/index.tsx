import React, { useState } from "react"
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker"
import Calendar from "./icons/Calendar"
import cx from "classnames"

import "react-datepicker/dist/react-datepicker.css"

export interface Props extends ReactDatePickerProps {
  label?: string
  errorMessage?: string
}

// re-export issue
const DatePicker = (ReactDatePicker as unknown as { default: typeof ReactDatePicker }).default ?? ReactDatePicker

export default function DateInput({ label, errorMessage, ...props }: Props) {
  function isFilled(value: unknown) {
    return value !== "" && value !== null && value !== undefined
  }

  const [filled, setFilled] = useState(isFilled(props.selected))
  const [focused, setFocused] = useState(false)

  function handleChange(date: Date | null, e: React.SyntheticEvent<any, Event> | undefined) {
    props.onChange?.(date, e)
    setFilled(isFilled(date))
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
      className={cx("leaf-input-container", "leaf-date-input", {
        filled,
        focused,
        error: errorMessage,
        disabled: props.disabled,
      })}
    >
      <div className="leaf-label-area">
        <label className="leaf-label">{label}</label>
      </div>
      <DatePicker
        fixedHeight
        showIcon
        icon={<Calendar className="react-datepicker__calendar-icon" color="currentColor" />}
        {...props}
        wrapperClassName="leaf-input-area"
        className="leaf-input"
        clearButtonClassName="leaf-clear-button"
        isClearable={props.isClearable ?? true}
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
