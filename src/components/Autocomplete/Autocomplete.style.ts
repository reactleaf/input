import { GroupBase, StylesConfig } from "react-select"
import { defaultTheme } from "@reactleaf/theme"

const { colors } = defaultTheme
export function getStyle<Option, isMulti extends boolean, Group extends GroupBase<Option>>({
  isError,
}: {
  isError: boolean
}): StylesConfig<Option, isMulti, Group> {
  return {
    control: (base, props) => ({
      ...base,
      width: "100%",
      boxShadow: "none",
      backgroundColor: props.isDisabled ? "var(--leaf-grey-95)" : "white",
      borderColor: props.isFocused
        ? "var(--leaf-primary-60)"
        : isError
        ? "var(--leaf-status-red)"
        : props.hasValue
        ? "var(--leaf-grey-10)"
        : "var(--leaf-grey-80)",
      "&:hover": {
        borderColor: props.isFocused
          ? "var(--leaf-primary-60)"
          : isError
          ? "var(--leaf-status-red)"
          : "var(--leaf-grey-70)",
      },
    }),
    placeholder: (base) => ({ ...base, color: "var(--leaf-grey-80)" }),
    dropdownIndicator: (base, props) => ({
      ...base,
      color: props.isFocused ? "var(--leaf-primary-60)" : "var(--leaf-grey-80)",
      "&:hover": {
        color: props.isFocused ? "var(--leaf-primary-60)" : "var(--leaf-grey-70)",
      },
    }),
    clearIndicator: (base, props) => ({ ...base, cursor: "pointer" }),
    option: (base, props) => ({
      ...base,
      cursor: "pointer",
      color: "var(--leaf-grey-10)",
      backgroundColor: props.isSelected
        ? "var(--leaf-primary-95)"
        : props.isFocused
        ? "var(--leaf-primary-98)"
        : "transparent",
      "&:active": {
        backgroundColor: "var(--leaf-primary-95)",
      },
    }),
    multiValue: (base, props) => ({ ...base, backgroundColor: "var(--leaf-primary-90)" }),
  }
}
