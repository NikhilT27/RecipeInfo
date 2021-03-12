import React from "react";

export default function EachIngredients({ text, image, weight }) {
  return (
    <>
      <div className="recipe-ingredient-each">
        {/* <div className="bullet"></div> */}
        <div className="">
          <img
            src={image}
            alt="Image"
            className="recipe-ingredient-each-image"
          />
        </div>
        <div className="recipe-ingredient-each-title">{text}</div>
      </div>
    </>
  );
}
