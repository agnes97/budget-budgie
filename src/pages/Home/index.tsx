import { FC } from "react";

import Header from "components/Header";
import Budget from "components/Budget"
import Footer from "components/Footer";

const Home: FC = () => (
  <>
    <Header />
    <main>
      <Budget />
    </main>
    <Footer />
  </>
);

export default Home;
