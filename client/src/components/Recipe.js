import React, { useState } from "react";
import clock from "../images/clock.svg";
import axios from "axios";

import EachRecipeFeature from "../components/EachRecipeFeature";
import EachIngredients from "../components/EachIngredients";
import RecipeExtra from "../components/RecipeExtra";
import cautions from "../images/warning.svg";
import diet from "../images/diet.svg";
import health from "../images/heartbeat.svg";

export default function Recipe({ data }) {
  const [clicked, setClicked] = useState(false);

  async function saveRecipe() {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(
      "/recipe/saveRecipe",
      { recipe: data },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response) {
      console.log(response.data);
    }
  }

  return (
    <>
      <div onClick={() => setClicked(true)} className="recipe">
        <div>
          <img src={data.image} alt={data.label} className="recipe-image" />
        </div>
        {data.totalTime == "0" ? (
          <div></div>
        ) : (
          <div className="recipe-time">
            <img src={clock} alt="recipe time" className="recipe-time-logo" />
            <span>{data.totalTime} mins</span>
          </div>
        )}
        <div className="recipe-title">{data.label}</div>
        <div className="recipe-source">{data.source}</div>
      </div>

      {clicked ? (
        <div className="recipe-detail">
          <div className="recipe-option">
            <div
              className="recipe-option-back"
              onClick={() => setClicked(false)}
            ></div>
            <div
              className="recipe-option-save"
              onClick={() => saveRecipe()}
            ></div>
          </div>
          <div>
            <img src={data.image} alt="name" className="recipe-detail-image" />
          </div>
          <div className="recipe-detail-data">
            <div className="recipe-line"></div>
            <div className="recipe-detail-title-box">
              <div>
                <div className="recipe-detail-title">{data.label}</div>
                <div className="recipe-detail-source">
                  Source: {data.source}
                </div>
              </div>
              {data.totalTime == "0" ? (
                <div></div>
              ) : (
                <div className="recipe-detail-time">
                  <img
                    src={clock}
                    alt="recipe time"
                    className="recipe-time-logo"
                  />
                  <span className="recipe-detail-time-text">
                    {data.totalTime} mins
                  </span>
                </div>
              )}
            </div>
            <div className="recipe-feature">
              <EachRecipeFeature value={data.yield} title="Yield" />
              <EachRecipeFeature
                value={parseFloat(data.calories).toPrecision(4)}
                title="Calories"
              />
              <EachRecipeFeature
                value={parseFloat(data.totalWeight).toPrecision(4)}
                title="Ounces"
              />
            </div>

            <RecipeExtra
              title="Cautions"
              list={data.cautions}
              image={cautions}
            />
            <RecipeExtra title="Diet" list={data.dietLabels} image={diet} />
            <RecipeExtra
              title="Health"
              list={data.healthLabels}
              image={health}
            />

            <div className="recipe-ingredient-title ">Ingredients</div>
            {data.ingredients.map(({ text, image, weight }) => {
              return (
                <EachIngredients text={text} image={image} weight={weight} />
              );
            })}
            <div className="recipe-link">
              <div className="recipe-link-title ">Recipe Link:</div>
              <a href={data.url} target="_blank">
                <div className="recipe-link-logo"></div>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
