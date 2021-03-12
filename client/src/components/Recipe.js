import React, { useState } from "react";
import image from "../images/recipe1.jpg";
import clock from "../images/clock.svg";
import { Link } from "react-router-dom";

import EachRecipeFeature from "../components/EachRecipeFeature";

export default function Recipe() {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <div onClick={() => setClicked(true)}>
        <div className="recipe">
          <div>
            <img src={image} alt="name" className="recipe-image" />
          </div>
          <div className="recipe-time">
            <img src={clock} alt="recipe time" className="recipe-time-logo" />
            <span>30 mins</span>
          </div>
          <div className="recipe-title">Name</div>
          <div className="recipe-source">Source</div>
        </div>
      </div>
      {clicked ? (
        <div className="recipe-detail">
          <div className="recipe-option">
            <div
              onClick={() => setClicked(false)}
              className="recipe-option-back"
            ></div>
            <div className="recipe-option-save"></div>
          </div>
          <div>
            <img src={image} alt="name" className="recipe-detail-image" />
          </div>
          <div className="recipe-detail-data">
            <div className="recipe-detail-title-box">
              <div>
                <div className="recipe-detail-title">Name</div>
                <div className="recipe-detail-source">Source</div>
              </div>
              <div className="recipe-detail-time">
                <img
                  src={clock}
                  alt="recipe time"
                  className="recipe-time-logo"
                />
                <span>30 mins</span>
              </div>
            </div>
            <div className="recipe-feature">
              <EachRecipeFeature value="01" title="Yeild" />
              <EachRecipeFeature value="200" title="Calories" />
              <EachRecipeFeature value="163" title="Ounces" />
            </div>
            <div className="recipe-ingredient-title ">Ingredients</div>
            <div className="recipe-ingredient-each">
              <div className="bullet"></div>
              <div className="recipe-ingredient-each-title">Name</div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
