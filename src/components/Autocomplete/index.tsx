import React from "react"
import Creatable from "react-select/creatable"
import { getStyle } from "./Autocomplete.style"

export interface Props
  extends Omit<React.ComponentProps<typeof Creatable>, "className" | "classNamePrefix" | "styles" | "isSearchable"> {
  label?: string
  errorMessage?: string
}

export default function Autocomplete({ label, errorMessage, ...props }: Props) {
  return (
    <div className="leaf-autocomplete-container">
      <div className="leaf-label-area">
        <label className="leaf-label">{label}</label>
      </div>
      <Creatable
        {...props}
        className="leaf-autocomplete"
        classNamePrefix="leaf-autocomplete"
        isClearable={props.isClearable ?? true}
        styles={getStyle({ isError: !!errorMessage })}
      />
      <div className="leaf-extra-area">
        <p className="leaf-error-message leaf-desc">{errorMessage}</p>
      </div>
    </div>
  )
}
