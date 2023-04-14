import styled from "styled-components"

export const Input = styled.input`
  width: 100%;
  height: 2rem;
  padding: 0 0.5em;
  border-radius: 4px;
  ${({ theme }) => theme.typo.body};
`
