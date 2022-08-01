import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CocktailsList from "../components/CocktailsList";

const Home = () => {
  return (
    <>
      <Header />
      <CocktailsList />
      <Footer />
    </>
  );
};

export default Home;
