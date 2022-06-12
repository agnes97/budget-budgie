import styled from 'styled-components'

import { device } from 'themes/variables'

export const StyledArticleIncome = styled.article`
  &.have-month {
    background-color: var(--have-month-background);

    & * h2,
    * h3 {
      color: var(--have-month-titles);
    }

    & > .content {
      & * .name {
        font-weight: bold;
      }

      & * .wage {
        padding-right: 2rem;
        text-align: right;

        &::after {
          content: ' czk';
          font-size: 1.2rem;
        }

        @media ${device.mobile} {
          padding: 0;
        }
      }

      & * .name,
      .wage {
        @media ${device.mobile} {
          min-width: 30%;
        }
        @media ${device.ipad} {
          min-width: 20%;
        }
        @media ${device.desktop} {
          min-width: 50%;
        }
      }
    }
  }
`
