import styled from 'styled-components'

import { device } from 'themes/variables'

export const StyledPopUp = styled.section`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(1rem);
  background-color: hsla(0, 0%, 100%, 0.5);
  opacity: 0;
  visibility: hidden;

  &.pop-up-open {
    opacity: 1;
    visibility: visible;
  }

  & > .pop-up-container {
    max-height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1rem solid var(--background-transparent-color);
    padding: 2rem 1.5rem;
    overflow-y: scroll;

    &.have-month-colors {
      background-color: var(--have-month-background);
      & * h2 {
        color: var(--have-month-titles);
      }
    }

    &.need-month-colors {
      background-color: var(--need-month-background);
      & * h2 {
        color: var(--need-month-titles);
      }
    }

    &.need-year-colors {
      background-color: var(--need-year-background);
      & * h2 {
        color: var(--need-year-titles);
      }
    }

    &.want-colors {
      background-color: var(--want-background);
      & * h2 {
        color: var(--want-titles);
      }
    }

    &.goals-colors {
      background-color: var(--goals-background);
      & * h2 {
        color: var(--goals-titles);
      }
    }

    &.black-colors {
      background-color: #717171;
      & * h2 {
        color: var(--text-primary-color);
      }
    }

    @media ${device.mobile} {
      width: 85%;
    }
    @media ${device.ipad} {
      width: 65%;
    }
    @media ${device.desktop} {
      width: 40%;
    }

    & > header.pop-up-header {
      width: 100%;
      display: flex;
      align-items: center;

      @media ${device.mobile} {
        flex-direction: column;
      }

      & > h2.pop-up-title {
        text-align-last: start;
        margin-left: 3rem;
        flex-grow: 1;
        text-transform: uppercase;

        &::before,
        &::after {
          content: none !important;
        }

        @media ${device.mobile} {
          text-align-last: center;
          margin: 0 auto;
          padding: 2rem 1rem 0.5rem 1rem;
        }
      }

      & > button.close {
        margin-right: 3rem;

        @media ${device.mobile} {
          margin-right: 0;
          order: -1;
        }
      }
    }

    & > article.note-container {
      margin-bottom: 1rem;
      padding: 0 1rem;
      text-align: left;
      overflow: auto;

      @media ${device.mobile} {
        padding: 0;
      }

      & > ul {
        margin: 0;
      }

      & * p,
      * h2,
      h3,
      h4 {
        margin: 1rem !important;
      }

      & * a {
        color: var(--text-transparent-color) !important;
      }

      & > .no-note {
        color: var(--text-transparent-color);
        font-size: var(--h2-desktop);
        margin: 1.5rem 0 1rem 0;
        text-align: center;
      }
    }
  }
`
