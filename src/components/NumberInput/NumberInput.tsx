import React, { useLayoutEffect, useRef, useState } from "react"
import cx from "classnames"

import useInnerRef from "@/hooks/useInnerRef"

import X from "@/icons/X"

import * as CS from "../common.style"
import { formatNumber, formatNumberWithCommas, parseNumber } from "./formatter"

export interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string
  clearable?: boolean
  errorMessage?: string
  step?: number
  min?: number
  max?: number
  commas?: boolean
  suffix?: string
  onValueChange?: (value: number) => void
  onEnter?: (value: number) => void
}

export default React.forwardRef(function NumberInput(
  {
    value,
    label,
    clearable = true,
    errorMessage,
    step = 1,
    min = 0,
    max,
    commas,
    suffix,
    onValueChange,
    onEnter,
    ...inputProps
  }: Props,
  outerRef: React.Ref<HTMLInputElement>
) {
  const ref = useInnerRef(outerRef)
  const suffixRef = useRef<HTMLSpanElement>(null)
  const [filled, setFilled] = useState(isFilled(value))
  const [focused, setFocused] = useState(false)

  const formatter = commas ? formatNumberWithCommas : formatNumber

  // suffix의 길이에 맞춰 padding-right 추가
  useLayoutEffect(() => {
    if (!suffixRef.current) return
    if (ref.current) {
      ref.current.style.paddingRight = `calc(10px + ${suffixRef.current.offsetWidth}px)`
    }
  }, [suffix])

  useLayoutEffect(() => {
    if (typeof value !== "number") return
    if (ref.current) {
      ref.current.value = formatter(value)
    }
  }, [value])

  function isFilled(value: unknown) {
    return value !== "" && value !== undefined
  }

  function isWatiable(value: string) {
    // do not format while inputting -
    const inputtingMinus = /^-0?$/
    if (inputtingMinus.test(value)) return true

    // do not format while inputting n.00x
    const inputtingDecimals = /[^.]\.{1}0*$/
    if (inputtingDecimals.test(value)) return true

    return false
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
    onValueChange?.(parseNumber(formattedValue))
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
    const value = parseNumber(e.currentTarget.value)

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
          style={{ textAlign: "right", ...inputProps.style }}
        />
        {suffix && <CS.Suffix ref={suffixRef}>{suffix}</CS.Suffix>}
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
