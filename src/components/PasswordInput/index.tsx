import React, { useState } from "react"
import cx from "classnames"

import useInnerRef from "@/hooks/useInnerRef"
import Eye from "./icons/Eye"

export interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string
  clearable?: boolean
  errorMessage?: string
  onValueChange?: (value: string) => void
  onEnter?: (value: string) => void
}

export default React.forwardRef(function PasswordInput(
  { label, clearable = true, errorMessage, onChange, onValueChange, onEnter, ...inputProps }: Props,
  outerRef: React.Ref<HTMLInputElement>
) {
  const ref = useInnerRef(outerRef)
  const [filled, setFilled] = useState(isFilled(inputProps.value))
  const [focused, setFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  function isFilled(value: unknown) {
    return value !== "" && value !== undefined
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value
    if (ref.current) {
      ref.current.value = value
    }
    onChange?.(e)
    onValueChange?.(value)
    setFilled(isFilled(e.target.value))
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    inputProps.onFocus?.(e)
    setFocused(true)
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    inputProps.onBlur?.(e)
    setFocused(false)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    inputProps.onKeyDown?.(e)
    if (e.key === "Enter") {
      onEnter?.(e.currentTarget.value)
    }
  }

  function handleClear() {
    changeValue("")
  }

  function changeValue(newValue: string) {
    if (!ref.current) return

    // trigger changed event
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set
    nativeInputValueSetter?.call(ref.current, newValue)

    const event = new Event("input", { bubbles: true })
    ref.current.dispatchEvent(event)
  }

  const isClearable = clearable && filled && !inputProps.disabled && !inputProps.readOnly
  const isError = Boolean(errorMessage)

  return (
    <div
      className={cx("leaf-input-container", "leaf-password-input", {
        filled,
        focused,
        error: isError,
        disabled: inputProps.disabled,
      })}
    >
      <div className="leaf-label-area">{label && <label className="leaf-label">{label}</label>}</div>
      <div className={cx("leaf-input-area")}>
        <input
          type={showPassword ? "text" : "password"}
          {...inputProps}
          className={cx("leaf-input", { clearable }, inputProps.className)}
          ref={ref}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
        {!inputProps.disabled && !inputProps.readOnly && (
          <button type="button" className="leaf-password-eye" onClick={() => setShowPassword((e) => !e)} tabIndex={-1}>
            <Eye opened={showPassword} />
          </button>
        )}
        {isClearable && <button type="button" className="leaf-clear-button" onClick={handleClear} tabIndex={-1} />}
      </div>
      <div className="leaf-extra-area">
        {errorMessage && <p className={cx("leaf-error-message", "leaf-desc")}>{errorMessage}</p>}
      </div>
    </div>
  )
})
