import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const CocktailsList = () => {
  const [cocktails, setCocktails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("a");
  const [loading, setLoading] = useState(true);
  const searchValue = useRef("");

  useEffect(() => {
    axios
      .get(`${url}${searchTerm}`)
      .then((response) => {
        const cocktails = response.data.drinks;
        if (cocktails) {
          setCocktails(cocktails);
        } else {
          setCocktails([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [searchTerm]);

  if (loading) {
    return (
      <main>
        <div className="spinner"></div>
      </main>
    );
  }
  if (cocktails.length < 1) {
    return (
      <main>
        <Link to="/" className="btn">
          back home
        </Link>
        <h1 className="error">No such cocktail in our database</h1>
      </main>
    );
  }
  const searchCocktail = () => {
    setSearchTerm(searchValue.current.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main id="cocktalil-list">
      <div id="search-cocktails">
        <form className="search-form" onSubmit={handleSubmit}>
          <div className="form-component">
            <label htmlFor="search"></label>
            <input
              type="search"
              name="search"
              id="search"
              onChange={searchCocktail}
              ref={searchValue}
              placeholder="Search your favorite cocktail..."
            />
          </div>
        </form>
      </div>
      <div className="cocktails">
        {cocktails.map((cocktail) => {
          const {
            idDrink: id,
            strDrink: name,
            strDrinkThumb: image,
          } = cocktail;
          return (
            <Link to={`/cocktail/${id}`} key={id}>
              <div className="cocktail-card">
                <img src={image} alt={name} />
                <div className="text-wrap">
                  <h3 className="card-title">{name}</h3>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default CocktailsList;
