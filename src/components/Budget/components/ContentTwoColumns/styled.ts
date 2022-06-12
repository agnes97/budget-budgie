import styled from 'styled-components'

import { device } from 'themes/variables'

export const StyledContentTwoColumns = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;

  @media ${device.desktop} {
    justify-content: space-between;
  }

  & > .cost {
    &::after {
      content: ' czk';
      font-size: 1.2rem;
    }
  }

  & > .cost,
  .undefined-cost {
    text-align: right;

    @media ${device.mobile} {
      min-width: 25%;
    }
    @media ${device.ipad} {
      min-width: 20%;
    }
    @media ${device.desktop} {
      min-width: 30%;
    }
  }

  & > div,
  * .item {
    @media ${device.mobile} {
      min-width: 55%;
    }
    @media ${device.ipad} {
      min-width: 30%;
    }
    @media ${device.desktop} {
      min-width: 60%;
    }
  }
`
