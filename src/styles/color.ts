import Color from "color"
import { css } from "styled-components"

import { ColorTheme } from "./theme"

// color converting utils
export function primary(number: keyof ColorTheme["primary"], alpha: number = 1) {
  return css`
    ${({ theme }) => Color(theme.colors.primary[number]).alpha(alpha).string()}
  `
}

export function status(color: keyof ColorTheme["status"], alpha: number = 1) {
  return css`
    ${({ theme }) => Color(theme.colors.status[color]).alpha(alpha).string()}
  `
}
