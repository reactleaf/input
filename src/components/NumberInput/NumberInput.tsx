import React, { useState } from "react"
import cx from "classnames"

import useInnerRef from "@/hooks/useInnerRef"

import X from "@/icons/X"

import * as CS from "../common.style"

export interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string
  clearable?: boolean
  errorMessage?: string
  step?: number
  min?: number
  max?: number
  onValueChange?: (value: number) => void
  onEnter?: (value: number) => void
  formatter?: (value: number) => string
  parser?: (value: string) => number
}

export default React.forwardRef(function NumberInput(
  {
    label,
    clearable = true,
    errorMessage,
    step = 1,
    min = 0,
    max,
    onValueChange,
    onEnter,
    formatter = formatNumber,
    parser = parseNumber,
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

  // do not format while inputting -0.00x
  function isWatiable(value: string) {
    const regex = /^-?0?\.?0*$/
    return regex.test(value)
  }

  function setInRange(value: number) {
    if (typeof min === "number" && value < min) {
      value = min
    } else if (typeof max === "number" && max < value) {
      value = max
    }
    return value
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (isWatiable(e.currentTarget.value)) return
    const formattedValue = formatter(parseNumber(e.currentTarget.value))
    if (ref.current) {
      ref.current.value = formattedValue
    }
    inputProps.onChange?.(e)
    onValueChange?.(parser(formattedValue))
    setFilled(isFilled(e.target.value))
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    inputProps.onFocus?.(e)
    setFocused(true)
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    inputProps.onBlur?.(e)
    setFocused(false)

    // check if value is in range, if not, set to min or max
    if (isWatiable(e.currentTarget.value)) return
    const inRangeValue = setInRange(parseNumber(e.currentTarget.value))
    changeValue(formatter(inRangeValue))
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    inputProps.onKeyDown?.(e)
    const value = parser(e.currentTarget.value)

    if (e.key === "Enter") {
      onEnter?.(value)
    }

    const arrowStep = e.shiftKey ? step * 10 : step
    if (e.key === "ArrowDown") {
      const stepDownValue = (value || 0) - arrowStep
      const newValue = Math.max(min, stepDownValue)
      changeValue(formatter(newValue))
      e.preventDefault()
    }
    if (e.key === "ArrowUp") {
      const stepUpValue = (value || 0) + arrowStep
      const newValue = max === undefined ? stepUpValue : Math.min(stepUpValue, max)
      changeValue(formatter(newValue))
      e.preventDefault()
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
      className={cx("number-input", {
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
          type="text"
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

function parseNumber(value?: string) {
  if (!value) return NaN
  const cleanPattern = new RegExp(`[^-+0-9.]`, "g")
  const cleaned = value.replace(cleanPattern, "")

  return parseFloat(cleaned)
}

function formatNumber(value?: number) {
  if (value === undefined) return ""
  if (isNaN(value)) return ""
  return value.toString()
}
