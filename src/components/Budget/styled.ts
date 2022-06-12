import styled from 'styled-components'

import { device } from 'themes/variables'

export const StyledBudget = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;

  @media ${device.ipad} {
    width: 85%;
  }

  @media ${device.desktop} {
    width: 100%;
    padding: 0 3rem;
    flex-direction: row;
  }

  > article {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1.5rem 0;

    & > h1,
    h2 {
      &::before {
        color: var(--text-secondary-color);
      }
      &::after {
        color: var(--text-secondary-color);
      }
    }

    & > .content {
      height: 100%;
      line-height: 1.7;

      @media ${device.mobile} {
        margin: 2rem 1rem;
      }
      @media ${device.ipad} {
        margin: 2rem 10rem;
      }
      @media ${device.desktop} {
        margin: 2rem;
      }

      & .emoji {
        margin-right: 0.5rem;
      }

      & .content-one-column-row:hover,
      .content-two-columns:hover {
        background-color: var(--background-transparent-color);
      }
    }
  }
`
