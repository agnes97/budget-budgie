import { createGlobalStyle } from 'styled-components'
import 'sanitize.css'
import 'sanitize.css/typography.css'

import { budgetColorscheme, colorScheme, device } from './variables'

export const GlobalStyles = createGlobalStyle`
    * {
        scrollbar-width: none;

        &::-webkit-scrollbar {
            width: 0;
        }
    }

    html {
        font-family: 'Timew New Roman', serif;
        font-size: 62.5%;
    }

    body {
        /* COLOR SCHEME */
        --background-primary-color: ${colorScheme.backgroundPrimaryColor};
        --background-transparent-color: ${colorScheme.backgroundTransparentColor};
        --text-primary-color: ${colorScheme.textPrimaryColor};
        --text-secondary-color: ${colorScheme.textSecondaryColor};
        --text-transparent-color: ${colorScheme.textTransparentColor};

        /* BUDGET COLOR SCHEME */
        --have-month-background: ${budgetColorscheme.haveMonthBackground};
        --have-month-titles: ${budgetColorscheme.haveMonthTitles};
        --need-month-background: ${budgetColorscheme.needMonthBackground};
        --need-month-titles: ${budgetColorscheme.needMonthTitles};
        --need-year-background: ${budgetColorscheme.needYearBackground};
        --need-year-titles: ${budgetColorscheme.needYearTitles};
        --want-background: ${budgetColorscheme.wantBackground};
        --want-titles: ${budgetColorscheme.wantTitles};
        --goals-background: ${budgetColorscheme.goalsBackground};
        --goals-titles: ${budgetColorscheme.goalsTitles};

        /* FONT-SIZE MOBILE */
        --default-phone: 2rem;
        --h1-phone: 3rem;
        --h2-phone: 2.5rem;
        --h3-phone: 2.5rem;
        --h4-phone: 2rem;

        /* FONT-SIZE DESKTOP */
        --default-desktop: 1.3rem;
        --h1-desktop: 5rem;
        --h2-desktop: 1.5rem;
        --h3-desktop: 1.5rem;
        --h4-desktop: 1.3rem;

        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: var(--background-primary-color);

        & h1, h2, h3, h4 {
            text-align: center;
        }

        & h1, h2 {
            &::before { content: '$$$ '; }
            &::after { content: ' $$$'; }
        }

        & .done {
            color: var(--text-transparent-color);
            text-decoration: line-through;
        }

        & a {
            color: var(--text-primary-color);
            text-decoration: none;
            cursor: pointer;
        }

        & p {
            padding: 0 3rem;
        }

        & .italic {
            font-style: italic;
        }

        @media ${device.ipad} {
            font-size: var(--default-desktop);
            
            & h1 { font-size: var(--h1-desktop); }
            & h2 { font-size: var(--h2-desktop); }
            & h3 { font-size: var(--h3-desktop); }
            & h4 { font-size: var(--h4-desktop); }
        }

        @media ${device.mobile} {
            font-size: var(--default-phone);

            & h1 { font-size: var(--h1-phone); }
            & h2 { font-size: var(--h2-phone); }
            & h3 { font-size: var(--h3-phone); }
            & h4 { font-size: var(--h4-phone); }
        }
    }

    main {
        flex-grow: 1;
        display: flex;
    }
`
