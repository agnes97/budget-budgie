import styled from 'styled-components'

export const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;

  & > div.form__children > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 1.5rem;
    gap: 0.5rem;

    & > label {
      color: var(--text-secondary-color);
      font-weight: bold;
    }

    & > input,
    & > textarea {
      width: 100%;
      border: none;
      outline: none;
      padding: 0.5rem;
      border-bottom: 0.1rem solid hsl(208, 21%, 88%);

      &::placeholder {
        color: var(--text-transparent-color);
      }
    }
  }

  & * span.title-after-button-text {
    padding: 0 0.5rem;
    text-transform: uppercase;
  }
`

interface Props {
  visibilityProp: boolean
  isEmojiChosen: boolean
}

export const StyledPickerContainer = styled.div<Props>`
  width: 100%;

  & > aside {
    display: ${(props) => (props.visibilityProp ? 'block' : 'none')};
    height: 30rem;
    width: 100%;
    border-radius: 0;
    box-shadow: none;
    position: inherit;
    overflow: auto;
    border: none;
    padding: 0.5rem;
  }

  & > .emojiPickerVisibilityButton {
    justify-content: left;
    width: 100%;
    ${(props) =>
      !props.isEmojiChosen && 'color: var(--text-transparent-color);'};
  }

  & * .active-category-indicator-wrapper {
    display: none;
  }

  & * button.active {
    background-color: var(--background-transparent-color);
    border-radius: 10%;
  }
`
