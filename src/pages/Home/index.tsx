import React from "react";

import Header from "components/Header";
import Budget from "components/Budget"
import Footer from "components/Footer";

const Home: React.FC = () => (
  <>
    <Header />
    <main>
      <Budget />
    </main>
    <Footer />
  </>
);

export default Home;
