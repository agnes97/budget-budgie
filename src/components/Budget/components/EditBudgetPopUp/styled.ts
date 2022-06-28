import styled from 'styled-components'

export const StyledDetails = styled.details`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 0.3rem;
  align-items: center;
  justify-content: center;

  & > summary {
    text-transform: uppercase;
    color: var(--text-secondary-color);
    font-weight: bold;
    padding: 0.5rem 0;
  }

  & form > input,
  & > textarea {
    width: 100%;
    margin: 1rem 0;
  }
`
