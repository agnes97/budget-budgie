import type { FC } from 'react'
import { Link } from 'react-router-dom'

import { Footer } from 'components/Footer'
import { Header } from 'components/Header'

import { Styled404PageSection } from './styled'

export const NotFoundPage: FC = () => (
  <>
    <Header />
    <main>
      <Styled404PageSection>
        <p>
          This page doesn&apos;t exist.
          <br /> Please, <Link to="/">return home</Link>.
        </p>
      </Styled404PageSection>
    </main>
    <Footer />
  </>
)
