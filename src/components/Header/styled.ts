import styled, { css, keyframes } from 'styled-components'

import { device } from 'themes/variables'

interface Props {
  animate: boolean
}

const displayAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export const StyledHeader = styled.header<Props>`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 3.5rem;
  align-items: center;

  & > section.page-title-container {
    padding-top: 4rem;
  }

  & section > div.page-title::before {
    ${(props) =>
      props.animate
        ? css`
            animation: ${displayAnimation} 2s 2s forwards;
            top: -1rem;
          `
        : css`
            display: none;
          `};
    opacity: 0;
    position: absolute;
    content: 'Budget Budgie';
    font-size: 1.8rem;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.5rem;
    background-color: var(--text-secondary-color);
    background-image: linear-gradient(
      90deg,
      rgb(148, 197, 125) 0%,
      rgb(224, 103, 103) 25%,
      rgb(246, 178, 106) 50%,
      rgb(176, 206, 237) 75%,
      rgb(181, 168, 214) 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
  }

  & section > div.page-title {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;
    z-index: -1;

    @media ${device.ipad} {
      flex-direction: row;
    }

    & > h1 {
      text-transform: uppercase;
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
      z-index: -1;

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

  & > .description {
    color: var(--text-secondary-color);
    text-align: center;
    padding: 1rem 2rem 0 2rem;

    @media ${device.mobile} {
      width: 85%;
      padding-top: 2rem;
    }
  }
`
