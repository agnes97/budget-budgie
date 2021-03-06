import styled from 'styled-components'

export const StyledDropdownMenu = styled.div`
  position: relative;

  &.hidden {
    visibility: hidden;
  }

  & > button {
    font-weight: bold;
    text-transform: uppercase;

    &::before {
      content: '📜';
      padding: 0 1rem;
    }

    &::after {
      content: '📜';
      padding: 0 1rem;
    }
  }

  & > ul.dropdown-menu-list {
    position: absolute;
    padding-inline-start: 0;
    margin: 0;
    display: none;
    width: 100%;

    & > li.dropdown-menu-item {
      min-width: 100%;
      list-style: none;
      background-color: hsl(0, 0%, 100%);
      padding: 1rem;
      z-index: 1;
      text-align: center;
      transition: letter-spacing 1s;
      cursor: pointer;

      & > div {
        display: block;
      }

      &:hover {
        background-color: hsl(0, 0%, 80%);
        letter-spacing: 0.2rem;
      }

      &.last-dropdown-menu-item {
        font-weight: bold;
        background-color: var(--background-primary-color);
        border-top: 0.5rem solid var(--background-primary-color);
      }

      & > div.gradient-text {
        background-color: var(--background-primary-color);
        background-image: linear-gradient(
          90deg,
          hsl(101, 38%, 63%) 0%,
          hsl(0, 66%, 64%) 25%,
          hsl(31, 89%, 69%) 50%,
          hsl(211, 63%, 81%) 75%,
          hsl(257, 36%, 75%) 100%
        );
        background-size: 100%;
        background-repeat: repeat;
        background-clip: text;
        -webkit-background-clip: text;
        -moz-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-text-fill-color: transparent;
      }
    }
  }

  &:hover > ul.dropdown-menu-list {
    display: flex;
    flex-direction: column;
  }
`
