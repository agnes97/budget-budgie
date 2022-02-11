import { FC } from "react";

import { Header } from "components/Header";
import { Budget } from "components/Budget"
import { Footer } from "components/Footer";

export const Home: FC = () => (
  <>
    <Header />
    <main>
      <Budget />
    </main>
    <Footer />
  </>
)

