import styled from 'styled-components'

export const StyledArticleTotal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  justify-content: flex-end;
  font-weight: bold;

  & > .column-total {
    width: 100%;
    text-align: center;
    padding: 0.5rem;

    &:hover {
      background-color: var(--background-transparent-color);
    }

    &::after {
      content: ' czk';
      font-size: 1.2rem;
    }
  }

  & > div {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
    padding: 0.5rem;
    margin: 0.5rem;

    &:hover {
      background-color: var(--background-transparent-color);
    }

    & > .subtitle {
      font-weight: normal;
      font-style: italic;
      padding-bottom: 0.5rem;
    }

    & > .title::after {
      content: ' (czk)';
      font-size: 1.2rem;
    }

    & > .numbers-container {
      display: flex;
      justify-content: center;
      gap: 1rem;

      & > .earnings {
        color: hsl(101, 50%, 30%);

        &::before {
          content: '\\002B';
          margin-right: 0.2rem;
        }
      }

      & > .expenses {
        color: hsl(0, 74%, 46%);

        &::before {
          content: '\\208B';
          margin-right: 0.2rem;
        }
      }

      & > .savings {
        color: hsl(263, 82%, 52%);

        &::before {
          content: '\\0221E';
          margin-right: 0.2rem;
        }
      }
    }
  }
`
