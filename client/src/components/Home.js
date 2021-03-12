import React, { useState, useEffect } from "react";
import search from "../images/search.svg";
import profile from "../images/hero.jpg";
import Recipe from "../components/Recipe";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [recipes, setRecipes] = useState({});
  const [searchData, setSearchData] = useState("Indian");

  useEffect(() => {
    getData(searchData);
  }, []);

  async function getData(value) {
    setRecipes({});
    const response = await axios.get("/search", {
      params: {
        q: value,
      },
    });

    if (response) {
      setRecipes(response.data);
    }
  }

  return (
    <>
      <div className="home">
        <Link to="/profile">
          <div className="home-profile"></div>
        </Link>
        <div className="home-greeting">Hello, Nikhil!</div>
        <div className="home-title">
          Make your own food,
          <br /> stay at<span className="golden"> home</span>.
        </div>
        <div className="search">
          <input
            className="search-input"
            placeholder="Search any recipe"
            onChange={(e) => setSearchData(e.target.value)}
          />
          <div
            className="search-logo"
            onClick={() => getData(searchData)}
          ></div>
        </div>
        <div className="home-title">Popular Recipes</div>
        {Object.keys(recipes).length === 0 && recipes.constructor === Object ? (
          <div>Loading</div>
        ) : (
          <div className="home-recipes-box">
            <div>
              {recipes.hits.map(({ recipe }, index) => {
                if ((index + 1) % 2 != 0) {
                  return <Recipe key={recipe.label + index} data={recipe} />;
                }
              })}
            </div>
            <div>
              {recipes.hits.map(({ recipe }, index) => {
                if ((index + 1) % 2 == 0) {
                  return <Recipe key={recipe.label} data={recipe} />;
                }
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
