import React, { useRef, useState } from "react"

import useInnerRef from "@/hooks/useInnerRef"
import TextInput, { Props as TextInputProps } from "../TextInput"
import useInteractOutside from "@/hooks/useInteractOutside"

function defaultGetOptionLabel<T extends { label: string }>(option: T) {
  return option.label
}

export interface Props<Option> extends TextInputProps {
  onComplete?: (value: Option | null) => void
  getOptionLabel?: (option: Option) => string
  options: Option[]
}

export default React.forwardRef(function Combobox<Option extends { label: string }>(
  { onChange, onComplete, getOptionLabel = defaultGetOptionLabel, options: rawOptions, ...inputProps }: Props<Option>,
  outerRef: React.Ref<HTMLInputElement>
) {
  const container = useRef<HTMLDivElement>(null)
  const ref = useInnerRef(outerRef)
  const lastSelected = useRef<Option | null>(null)
  const [value, setValue] = useState<string>("")
  const [filterKey, setFilterKey] = useState("") // not an input value, but a value to filter options
  const [isDropdownOpened, setDropdownOpened] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState<number>(0)

  useInteractOutside({ ref: container, onInteractOutside: handlePseudoBlur })

  const options = rawOptions.filter((option) => {
    const label = getOptionLabel(option)?.toString().toLocaleLowerCase()
    const testValue = filterKey.toLocaleLowerCase()
    return label.includes(testValue)
  })

  function handleValueChange(value: string) {
    setValue(value)
    inputProps.onValueChange?.(value)
    setFilterKey(value) // some value is inputted. filter options from now.
    if (value === "") {
      handleSelect(null)
    }
  }

  function handleSelect(option: Option | null) {
    if (option !== lastSelected.current) {
      onComplete?.(option)
    }

    if (!option) {
      notifyValueChanges("")
      lastSelected.current = null
    } else {
      notifyValueChanges(getOptionLabel(option))
      lastSelected.current = option
    }

    setDropdownOpened(false)
    setFilterKey("") // option selected. do not filter options on next focus.
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    inputProps.onFocus?.(e)
    setDropdownOpened(true)
  }

  // revert input value to the last selected option
  function handlePseudoBlur() {
    setDropdownOpened(false)
    if (ref.current!.value === "") {
      return handleSelect(null)
    }
    if (lastSelected.current) {
      return handleSelect(lastSelected.current)
    } else {
      return handleSelect(null)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    // 키보드가 눌리면 무조건 드롭다운을 보여준다
    setDropdownOpened(true)

    if (e.key === "ArrowDown") {
      e.preventDefault()
      const index = (focusedIndex + 1) % options.length
      setFocusedIndex(index)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      const index = (focusedIndex - 1 + options.length) % options.length
      setFocusedIndex(index)
    } else if (e.key === "Enter") {
      e.preventDefault()
      handleSelect(options[focusedIndex])
    } else if (e.key === "Escape") {
      e.preventDefault()
      setDropdownOpened(false)
    }

    inputProps.onKeyDown?.(e)
  }

  // 마우스의 hover + 키보드의 focused 가 달라서 두 개가 포커스 된 것처럼 보이는 케이스가 발생하지 않도록
  // 마우스가 hover 되면 focusedOption을 바꿔준다
  // 그런데 scrollIntoView로 스크롤되면 마우스가 다른 엘리먼트에 hover되면서 focusedOption이 두 번 바뀌므로
  // mouseMove 이벤트로 대체 구현한다
  const handleMouseMove = (option: Option) => {
    const optionIndex = options.findIndex((o) => o === option)
    setFocusedIndex(optionIndex)
  }

  function notifyValueChanges(newValue: string) {
    if (!ref.current) return

    // trigger changed event
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set
    nativeInputValueSetter?.call(ref.current, newValue)

    const event = new Event("input", { bubbles: true })
    ref.current.dispatchEvent(event)
  }

  return (
    <div className="leaf-combobox-container" ref={container}>
      <TextInput
        {...inputProps}
        ref={ref}
        value={value}
        onValueChange={handleValueChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      />
      {isDropdownOpened && (
        <ul className="leaf-dropdown">
          {options.map((option, i) => (
            <li
              key={option.label}
              className="leaf-dropdown-item"
              data-focused={i === focusedIndex}
              onClick={() => handleSelect(option)}
              onMouseMove={() => handleMouseMove(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
})
