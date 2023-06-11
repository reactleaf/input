import { primary, status } from "@reactleaf/theme"
import styled, { css } from "styled-components"
import * as CS from "../common.style"

export const InputArea = styled(CS.InputArea)`
  height: 4.5rem;
  &:hover {
    ${() => css``}
  }
`

export const Preview = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const FileName = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${primary(10)};
`

export const FileSize = styled.span<{ error?: boolean }>`
  position: absolute;
  z-index: 1;
  bottom: 0;
  right: 0;
  padding-right: 0.25rem;
  ${({ theme }) => theme.typo.label};
  color: ${primary(70)};
  ${({ error }) =>
    error &&
    css`
      color: ${status("red")};
    `}
`

export const UrlInput = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 2rem;
  box-sizing: border-box;
  backdrop-filter: blur(0.25rem);
  button {
    height: 2rem;
  }
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  height: 100%;
  backdrop-filter: none;
  opacity: 0;
  transition: backdrop-filter 0.2s, opacity 0.2s;
  :hover {
    opacity: 1;
    backdrop-filter: blur(0.25rem);
  }
`

export const OverlayButton = styled.button`
  background: white;
  padding: 0.25rem 0.75rem;
  cursor: pointer;
  ${({ theme }) => theme.typo.body};
  border: 1px solid black;
  border-radius: 0.25rem;
`
