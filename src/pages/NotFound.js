import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Header />
      <main>
        <Link to="/" className="btn">
          back home
        </Link>
        <h1 className="error">No such cocktail in our database</h1>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
