import Color from "color"
import { css } from "styled-components"
import { ColorTheme } from "./theme"

const statusColors: ColorTheme["status"] = {
  red: Color.lch(50, 80, 30).hex(),
  yellow: Color.lch(70, 100, 90).hex(),
  green: Color.lch(60, 80, 150).hex(),
  blue: Color.lch(50, 80, 240).hex(),
  grey: Color.lch(60, 0, 0).hex(),
}

const primaryColors: ColorTheme["primary"] = {
  // Inactive colors
  100: Color.lch(100, 0, 260).hex(), // #fff
  90: Color.lch(90, 3, 260).hex(), // #DFE3E8
  80: Color.lch(80, 3, 260).hex(), // #C3C7CC
  70: Color.lch(70, 3, 260).hex(), // #A7ACB0

  // Active colors
  98: Color.lch(98, 5, 260).hex(), // #F3FAFF
  95: Color.lch(95, 10, 260).hex(), // #E3F2FF
  50: Color.lch(50, 80, 260).hex(), // #0086FF
  40: Color.lch(40, 70, 260).hex(), // #006BD0
  20: Color.lch(20, 40, 260).hex(), // #00376A
  15: Color.lch(15, 30, 260).hex(), // #002A50
  10: Color.lch(10, 5, 260).hex(), // #161C22
}

export const colorTheme: ColorTheme = {
  primary: primaryColors,
  status: statusColors,
}

export const typoTheme = {
  body: css`
    font-size: 1rem;
    line-height: 1.5;
  `,
  title: css`
    font-size: 1.25rem;
    line-height: 2rem;
  `,
  label: css`
    font-size: 0.875rem;
    line-height: 1.25rem;
  `,
  description: css`
    font-size: 0.75rem;
    line-height: 1.5;
    opacity: 0.6;
  `,
  error: css`
    font-size: 0.75rem;
    line-height: 1.5;
    color: ${statusColors.red};
  `,
  link: css`
    font-size: 1rem;
    line-height: 1.5;
    color: ${colorTheme.primary[50]};
  `,
}
