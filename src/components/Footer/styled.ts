import styled from 'styled-components'

export const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  width: 100%;
  background: rgb(148, 197, 125);
  background: linear-gradient(
    90deg,
    hsl(101, 38%, 63%) 0%,
    hsl(0, 66%, 64%) 25%,
    hsl(31, 89%, 69%) 50%,
    hsl(211, 63%, 81%) 75%,
    hsl(257, 36%, 75%) 100%
  );

  & > p {
    color: var(--text-primary-color);
    font-weight: bold;
  }
`
