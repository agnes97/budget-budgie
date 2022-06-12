import styled from 'styled-components'

import { device } from 'themes/variables'

export const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > section.page-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2.5rem;
    place-content: center;

    @media ${device.ipad} {
      flex-direction: row;
    }

    & > h1 {
      color: var(--text-secondary-color);
      margin: 0;

      &::before {
        color: hsl(55, 100%, 70%);
      }
      &::after {
        color: hsl(55, 100%, 70%);
      }
    }

    & > .budgie {
      width: 100%;

      @media ${device.ipad} {
        width: 13rem;
      }
    }

    & :last-child {
      display: none;
      transform: scaleX(-1);

      @media ${device.ipad} {
        display: block;
      }
    }
  }
`