import styled from 'styled-components'

import { device } from 'themes/variables'

export const StyledNav = styled.nav`
  display: flex;
  padding: 1rem 3rem;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background: rgb(148, 197, 125);
  background: linear-gradient(
    90deg,
    hsl(101, 38%, 63%) 0%,
    hsl(0, 66%, 64%) 25%,
    hsl(31, 89%, 69%) 50%,
    hsl(211, 63%, 81%) 75%,
    hsl(257, 36%, 75%) 100%
  );

  @media ${device.mobile} {
    flex-direction: column-reverse;
    justify-content: center;
  }

  & * .user-name {
    color: hsl(0, 0%, 100%);
  }

  & > .auth-container {
    flex-grow: 1;
  }

  & > button,
  & > .auth-container > button {
    float: right;
    font-weight: bold;
    text-transform: uppercase;

    &.button-auth {
      &::before {
        content: '🗝️';
        padding: 0 1rem;
      }

      &::after {
        content: '🗝️';
        padding: 0 1rem;
      }
    }

    &.button-edit {
      &::before {
        content: '⚙️';
        padding: 0 1rem;
      }

      &::after {
        content: '⚙️';
        padding: 0 1rem;
      }
    }
  }
`
