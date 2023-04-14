import { SimpleInterpolation } from "styled-components"

export interface Theme {
  colors: ColorTheme
  typo: TypoTheme
}

export interface ColorTheme {
  primary: {
    // Inactive colors
    100: string
    90: string
    80: string
    70: string

    // Active colors
    98: string
    95: string
    50: string
    40: string
    20: string
    15: string
    10: string
  }
  status: {
    red: string
    yellow: string
    green: string
    blue: string
    grey: string
  }
}

export interface TypoTheme {
  body: SimpleInterpolation
  title: SimpleInterpolation
  label: SimpleInterpolation
  description: SimpleInterpolation
  error: SimpleInterpolation
  link: SimpleInterpolation
}
