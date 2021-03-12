import React from "react";

export default function EachRecipeFeature({ value, title }) {
  return (
    <>
      <div className="recipe-feature-each">
        <div className={`recipe-feature-each-logo ${title}`}></div>
        <div className="recipe-feature-each-value">{value}</div>
        <div className="recipe-feature-each-title">{title}</div>
      </div>
    </>
  );
}
