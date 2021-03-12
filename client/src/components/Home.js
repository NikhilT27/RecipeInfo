import React from "react";
import search from "../images/search.svg";
import profile from "../images/hero.jpg";
import Recipe from "../components/Recipe";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="home">
        <div className="home-profile"></div>
        <div className="home-greeting">Hello, Nikhil!</div>
        <div className="home-title">
          Make your own food,
          <br /> stay at<span className="golden"> home</span>.
        </div>
        <div className="search">
          <img src={search} alt="search reciepes" className="search-logo" />
          <input className="search-input" placeholder="Search any recipe" />
        </div>
        <div className="home-title">Popular Indian Recipes</div>
        <Recipe />
      </div>
    </>
  );
}
