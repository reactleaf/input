import { primary, status } from "@/styles/color"
import styled, { css } from "styled-components"

export const reset = css`
  input {
    border: none;
    outline: none;
  }
  button {
    padding: 0;
    border: none;
  }
  p {
    margin: 0;
  }
`
export const InputContainer = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  min-width: 10rem;
  ${reset};

  &.filled {
    ${() => css`
      ${LabelArea} {
        color: ${primary(10)};
      }
      ${InputArea} {
        border-color: ${primary(10)};
      }
    `}
  }

  &.focused {
    ${() => css`
      ${LabelArea} {
        color: ${primary(10)};
      }
      ${InputArea} {
        border-color: ${primary(50)};
      }
    `}
  }

  &.error {
    ${() => css`
      ${LabelArea} {
        color: ${status("red")};
      }
      ${InputArea} {
        border-color: ${status("red")};
      }
    `}
  }

  &.disabled {
    ${() => css`
      ${InputArea} {
        background-color: ${primary(90)};
        -webkit-placeholder: ${primary(80)};
      }
    `}
  }
`

export const LabelArea = styled.div`
  position: relative;
  height: 1.25rem;
  text-align: left;
  color: ${primary(10, 0.5)};

  label {
    padding-left: 0.25rem;
    transition: color 0.2s;
    ${({ theme }) => theme.typo.label}
  }
`

export const InputArea = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid ${primary(70)};
  border-radius: 4px;
  background: white;
  transition: border-color 0.2s;
  overflow: hidden;

  /* ${() =>
    css`
      :hover ${ClearButton} {
        display: block;
      }
    `} */
`

export const Input = styled.input`
  width: 100%;
  height: 2rem;
  padding: 0 0.5em;
  border-radius: 4px;
  ${({ theme }) => theme.typo.body};
`

export const ClearButton = styled.button.attrs({ type: "button" })`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-0.25rem, -50%);
  width: 1rem;
  height: 1rem;
  background: ${primary(95)};
  border-radius: 50%;
  line-height: 0;
  cursor: pointer;
  svg {
    stroke: ${primary(10)};
  }

  :hover svg {
    stroke: ${({ theme }) => theme.colors.status.red};
  }
`

export const ExtraArea = styled.div`
  min-height: 1.125rem;
`

export const Error = styled.p`
  padding-left: 0.25rem;
  ${({ theme }) => theme.typo.error}
`
