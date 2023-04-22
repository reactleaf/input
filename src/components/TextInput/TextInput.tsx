import React, { useState } from "react"
import cx from "classnames"

import useInnerRef from "@/hooks/useInnerRef"

import X from "@/icons/X"

import * as CS from "../common.style"

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  clearable?: boolean
  errorMessage?: string
  formatter?: (value: string) => string
  onEnter?: (value: string) => void
}

export default React.forwardRef(function TextInput(
  { label, clearable = true, errorMessage, formatter = (v) => v, onEnter, ...inputProps }: Props,
  outerRef: React.Ref<HTMLInputElement>
) {
  const ref = useInnerRef(outerRef)
  const [state, setState] = useState({
    isFilled: Boolean(inputProps.value),
    isFocused: false,
  })

  function applyFormatter(e: React.SyntheticEvent<HTMLInputElement>) {
    if (!ref.current) return
    const newValue = formatter(e.currentTarget.value)
    ref.current.value = newValue
    return newValue
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    applyFormatter(e)
    inputProps.onChange?.(e)
    setState((s) => ({ ...s, isFilled: Boolean(e.target.value) }))
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    inputProps.onFocus?.(e)
    setState((s) => ({ ...s, isFocused: true }))
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    inputProps.onBlur?.(e)
    setState((s) => ({ ...s, isFocused: false }))
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    inputProps.onKeyDown?.(e)
    if (e.key === "Enter") {
      const newValue = formatter(e.currentTarget.value)
      onEnter?.(newValue)
    }
  }

  function handleClear() {
    if (!ref.current) return

    // trigger changed event
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set
    nativeInputValueSetter?.call(ref.current, "")

    const event = new Event("input", { bubbles: true })
    ref.current.dispatchEvent(event)
  }

  const isClearable = clearable && state.isFilled && !inputProps.disabled && !inputProps.readOnly
  const isError = Boolean(errorMessage)

  return (
    <CS.InputContainer
      className={cx("text-input", {
        filled: state.isFilled,
        focused: state.isFocused,
        error: isError,
        disabled: inputProps.disabled,
      })}
    >
      <CS.LabelArea>{label && <label>{label}</label>}</CS.LabelArea>
      <CS.InputArea>
        <CS.Input
          ref={ref}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          {...inputProps}
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
