import styled from 'styled-components'

export const StyledArticleExpense = styled.article`
  &.need-month {
    background-color: var(--need-month-background);

    & * h2,
    * h3,
    .add-items {
      color: var(--need-month-titles);
    }
  }

  &.need-year {
    background-color: var(--need-year-background);

    & * h2,
    * h3,
    .add-items {
      color: var(--need-year-titles);
    }
  }

  &.want {
    background-color: var(--want-background);

    & * h2,
    * h3,
    .add-items {
      color: var(--want-titles);
    }
  }

  &.goals {
    background-color: var(--goals-background);

    & * h2,
    * h3,
    .add-items {
      color: var(--goals-titles);
    }
  }
`
