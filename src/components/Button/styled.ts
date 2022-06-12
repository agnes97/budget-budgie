import styled from 'styled-components'

import { device } from 'themes/variables'

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  color: var(--text-primary-color);
  background-color: inherit;
  border: 0.2rem dashed var(--background-transparent-color);
  cursor: pointer;

  &:hover {
    background-color: var(--background-transparent-color);
  }

  &.rectangular {
    align-items: baseline;
    margin: 0.3rem;
    padding: 0.7rem;
  }

  &.circular {
    align-items: center;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    padding: 1.5rem;

    @media ${device.mobile} {
      width: 1.5rem;
      height: 1.5rem;
      padding: 2rem;
    }
  }
`
