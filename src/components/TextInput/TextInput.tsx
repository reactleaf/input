import React, { useState } from "react"
import cx from "classnames"

import useInnerRef from "@/hooks/useInnerRef"

import X from "@/icons/X"

import * as CS from "../common.style"

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  clearable?: boolean
  errorMessage?: string
  onValueChange?: (value: string) => void
  formatter?: (value: string) => string
  onEnter?: (value: string) => void
}

export default React.forwardRef(function TextInput(
  {
    label,
    clearable = true,
    errorMessage,
    onChange,
    onValueChange,
    formatter = (v) => v,
    onEnter,
    ...inputProps
  }: Props,
  outerRef: React.Ref<HTMLInputElement>
) {
  const ref = useInnerRef(outerRef)
  const [filled, setFilled] = useState(isFilled(inputProps.value))
  const [focused, setFocused] = useState(false)

  function isFilled(value: unknown) {
    return value !== "" && value !== undefined
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formattedValue = formatter(e.currentTarget.value)
    if (ref.current) {
      ref.current.value = formattedValue
    }
    onChange?.(e)
    onValueChange?.(formattedValue)
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
      const newValue = formatter(e.currentTarget.value)
      onEnter?.(newValue)
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
    <CS.InputContainer
      className={cx("text-input", {
        filled,
        focused,
        error: isError,
        disabled: inputProps.disabled,
      })}
    >
      <CS.LabelArea>{label && <label>{label}</label>}</CS.LabelArea>
      <CS.InputArea>
        <CS.Input
          {...inputProps}
          ref={ref}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
        {isClearable && (
          <CS.ClearButton onClick={handleClear} tabIndex={-1}>
            <X size={16} />
          </CS.ClearButton>
        )}
      </CS.InputArea>
      <CS.ExtraArea>{errorMessage && <CS.Error>{errorMessage}</CS.Error>}</CS.ExtraArea>
    </CS.InputContainer>
  )
})
