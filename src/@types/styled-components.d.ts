import "styled-components"
import { Theme } from "@reactleaf/theme"

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
