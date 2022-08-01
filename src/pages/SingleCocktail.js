import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SingleCocktail = () => {
  let { id } = useParams();
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const [cocktail, setCocktail] = useState([""]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function getCocktail() {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0];
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];
          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          };
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getCocktail();
  }, [id]);
  if (loading) {
    return (
      <main className="loading">
        <div className="blob"></div>;
      </main>
    );
  }
  if (!cocktail) {
    return <h2 className="section-title">no cocktail to display</h2>;
  } else {
    const { name, image, category, info, glass, instructions, ingredients } =
      cocktail;
    return (
      <>
        <Header />
        <main className="post">
          <Link to="/" className="btn">
            back home
          </Link>
          <h1 className="title">{cocktail.name}</h1>
          <section className="cocktail">
            <img
              src={cocktail.image}
              alt={cocktail.name}
              className="cocktail-image"
            />
            <div className="cocktail-info">
              <p>
                <span className="category">category</span>
                <span className="text">{cocktail.category}</span>
              </p>
              <p>
                <span className="category">info</span>
                <span className="text">{cocktail.info}</span>
              </p>
              <p>
                <span className="category">glass</span>
                <span className="text">{cocktail.glass}</span>
              </p>
              <p>
                <span className="category">ingredients</span>
                <span className="text">
                  {ingredients.map((item, index) => {
                    return item ? <span key={index}> {item}, </span> : null;
                  })}
                </span>
              </p>
              <p>
                <span className="category">instructions</span>
                <span className="text">{instructions}</span>
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
};

//   useEffect(() => {
//     axios.get(url).then((response) => {
//       const data = response.data.drinks[0];

//       const {
//         idDrink: id,
//         strDrink: name,
//         strDrinkThumb: image,
//         strAlcoholic: info,
//         strCategory: category,
//         strGlass: glass,
//         strInstructions: instructions,
//         strIngredient1,
//         strIngredient2,
//         strIngredient3,
//         strIngredient4,
//         strIngredient5,
//       } = data;

//       const ingredients = [
//         strIngredient1,
//         strIngredient2,
//         strIngredient3,
//         strIngredient4,
//         strIngredient5,
//       ];

//       const newCocktail = {
//         id,
//         name,
//         image,
//         info,
//         category,
//         glass,
//         instructions,
//         ingredients,
//       };
//       setCocktail(newCocktail);
//     });
//     setLoading(false);
//   }, [id]);

//   if (loading) {
//     return (
//       <main className="loading">
//         <div className="blob"></div>;
//       </main>
//     );
//   }

//   if (!cocktail) {
//     return <h1 className="title">No cocktail to display</h1>;
//   }
//   const { name, image, category, info, glass, instructions, ingredients } =
//     cocktail;
//   console.log(ingredients);
//   return (
//     <>
//       <Header />
//       <main className="post">
//         <Link to="/" className="btn">
//           back home
//         </Link>
//         <h1 className="title">{cocktail.name}</h1>
//         <section className="cocktail">
//           <img
//             src={cocktail.image}
//             alt={cocktail.name}
//             className="cocktail-image"
//           />
//           <div className="cocktail-info">
//             <p>
//               <span className="category">category</span>
//               <span className="text">{cocktail.category}</span>
//             </p>
//             <p>
//               <span className="category">info</span>
//               <span className="text">{cocktail.info}</span>
//             </p>
//             <p>
//               <span className="category">glass</span>
//               <span className="text">{cocktail.glass}</span>
//             </p>
//             <p>
//               <span className="category">ingredients</span>
//               <span className="text">{cocktail.ingredients}</span>
//             </p>
//             <p>
//               <span className="category">instructions</span>
//               <span className="text">{instructions}</span>
//             </p>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// };

export default SingleCocktail;
