import React, { useState } from "react"
import cx from "classnames"

import useInnerRef from "@/hooks/useInnerRef"

import X from "@/icons/X"

import * as CS from "../common.style"

export interface Props {
  value: string
  label?: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  readOnly?: boolean
  disabled?: boolean
  clearable?: boolean
  autoComplete?: string
  errorMessage?: string
  formatter?: (value: string) => string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void
  onEnter?: (value: string) => void
}

export default React.forwardRef(function TextInput(
  {
    value,
    label,
    type = "text",
    placeholder,
    disabled = false,
    readOnly = false,
    clearable = true,
    autoComplete,
    errorMessage,
    formatter = (v) => v,
    onClick,
    onChange,
    onFocus,
    onBlur,
    onEnter,
  }: Props,
  outerRef: React.Ref<HTMLInputElement>
) {
  const ref = useInnerRef(outerRef)
  const [isFocused, setFocused] = useState(false)

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    onFocus?.(e)
    setFocused(true)
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    onBlur?.(e)
    setFocused(false)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const newValue = formatter(e.currentTarget.value)
    if (e.key === "Enter") {
      onEnter?.(newValue)
    }
    if (ref.current) {
      ref.current.value = newValue
    }
  }

  function handleClear() {
    if (ref.current) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set
      nativeInputValueSetter?.call(ref.current, "")

      const event = new Event("input", { bubbles: true })
      ref.current.dispatchEvent(event)
    }
  }

  return (
    <CS.InputContainer className={cx("input-text", { filled: value, focused: isFocused, error: errorMessage })}>
      <CS.LabelArea>{label && <label>{label}</label>}</CS.LabelArea>
      <CS.InputArea>
        <CS.Input
          ref={ref}
          type={type}
          value={value}
          placeholder={placeholder}
          onClick={onClick}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          disabled={disabled}
          autoComplete={autoComplete}
        />
        {!disabled && !readOnly && clearable && value && (
          <CS.ClearButton onClick={handleClear} tabIndex={-1}>
            <X size={16} />
          </CS.ClearButton>
        )}
      </CS.InputArea>
      <CS.ExtraArea>{errorMessage && <CS.Error>{errorMessage}</CS.Error>}</CS.ExtraArea>
    </CS.InputContainer>
  )
})
