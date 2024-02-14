import React from "react"
import Select from "react-select"
import { getStyle } from "./Combobox.style"

export interface Props extends Omit<React.ComponentProps<typeof Select>, "className" | "classNamePrefix" | "styles"> {
  label?: string
  errorMessage?: string
}

export default function Combobox({ label, errorMessage, ...props }: Props) {
  return (
    <div className="leaf-combobox-container">
      <div className="leaf-label-area">
        <label className="leaf-label">{label}</label>
      </div>
      <Select
        {...props}
        className="leaf-combobox"
        classNamePrefix="leaf-combobox"
        isClearable={props.isClearable ?? true}
        styles={getStyle({ isError: !!errorMessage })}
      />
      <div className="leaf-extra-area">
        <p className="leaf-error-message leaf-desc">{errorMessage}</p>
      </div>
    </div>
  )
}
