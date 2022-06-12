import styled from 'styled-components'

export const StyledArticleHeader = styled.header`
  display: flex;
  flex-direction: column;

  & > h3 {
    font-style: italic;
    margin: -0.5rem 0;

    &::before {
      content: '~ ';
    }
    &::after {
      content: ' ~';
    }
  }
`
