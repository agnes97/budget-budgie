import styled from 'styled-components'

export const StyledButtonContainer = styled.div`
  & > h2 {
    margin: 2rem 1rem 0 1rem;
  }

  & > .button-list {
    display: flex;
    flex-flow: row wrap;
    padding: 0.5rem;
    justify-content: center;
  }
`
