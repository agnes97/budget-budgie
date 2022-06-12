import styled from 'styled-components'

export const StyledContainer = styled.section`
  display: flex;
  justify-content: center;
  padding: 1rem 0;

  & > form.add-items-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;

    & > .add-items-form-inputs {
      display: flex;
      flex-flow: column;
      gap: 0.3rem;
      color: white;
      font-weight: bold;

      & * label {
        margin-right: 0.5rem;
      }
    }
  }

  & > button.submit-button {
    font-size: 2rem;
    font-weight: bold;
    color: var(--background-transparent-color);
  }
`
