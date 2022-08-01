import styled from 'styled-components'

export const Styled404PageSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 0;

  & > p {
    padding: 1rem;
    margin-block-start: 0;
    margin-block-end: 0;
    font-size: var(--h1-desktop);
    color: var(--text-transparent-color);
  }

  & * a {
    color: white;
    font-style: italic;
  }
`
