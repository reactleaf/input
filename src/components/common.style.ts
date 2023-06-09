import { grey, primary, status } from "@reactleaf/theme"
import styled, { css } from "styled-components"

export const reset = css`
  input {
    border: none;
    outline: none;
    ::placeholder {
      color: ${grey(70)};
      font-weight: 200;
    }
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
        color: ${grey(10)};
      }
      ${InputArea} {
        border-color: ${grey(10)};
      }
    `}
  }

  &.focused {
    ${() => css`
      ${LabelArea} {
        color: ${grey(10)};
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
        background-color: ${grey(90)};
      }
    `}
  }
`

export const LabelArea = styled.div`
  position: relative;
  height: 1.25rem;
  text-align: left;
  color: ${grey(10, 0.5)};

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
  border: 1px solid ${grey(70)};
  border-radius: 4px;
  background: white;
  transition: border-color 0.2s;
  overflow: hidden;

  ${() =>
    css`
      :hover ${ClearButton} {
        display: block;
      }
    `}
`

export const Input = styled.input`
  width: 100%;
  height: 2rem;
  padding: 0 0.5em;
  border-radius: 4px;
  ${({ theme }) => theme.typo.body};
`

export const Suffix = styled.span`
  position: absolute;
  bottom: 50%;
  right: 0.5rem;
  padding-left: 0.25em;
  transform: translateY(50%);
  ${({ theme }) => theme.typo.label};
  color: ${primary(10, 0.5)};
`

export const ClearButton = styled.button.attrs({ type: "button" })`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-0.25rem, -50%);
  display: none;
  width: 1rem;
  height: 1rem;
  padding: 0;
  border: none;
  background: ${primary(95)};
  border-radius: 50%;
  line-height: 0;
  cursor: pointer;
  svg {
    stroke: ${grey(10)};
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
  ${({ theme }) => theme.typo.description};
  color: ${status("red")};
`
