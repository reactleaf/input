import React, { useState } from "react"
import DatePicker, { ReactDatePickerProps } from "react-datepicker"
import Calendar from "./icons/Calendar"
import cx from "classnames"

import "react-datepicker/dist/react-datepicker.css"
import "./DateInput.css"

export interface Props extends ReactDatePickerProps {
  label?: string
  errorMessage?: string
}

export default React.forwardRef(function DateInput(
  { label, errorMessage, ...props }: Props,
  ref: React.Ref<DatePicker>
) {
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
        ref={ref}
        fixedHeight
        {...props}
        wrapperClassName="leaf-input-area"
        className="leaf-input"
        clearButtonClassName="leaf-clear-button"
        isClearable={props.isClearable ?? true}
        icon={<Calendar className="react-datepicker__calendar-icon" color="currentColor" />}
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
