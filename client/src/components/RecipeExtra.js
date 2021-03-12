import React from "react";

export default function RecipeExtra({ title, list, image }) {
  return (
    <>
      {list.length === 0 ? (
        <div></div>
      ) : (
        <div className="recipe-extra">
          <div className="recipe-extra-box">
            <img src={image} alt={title} className="recipe-extra-logo" />
            <div className="recipe-extra-title ">{title}</div>
          </div>
          <div className="recipe-extra-info">
            {list.map((data) => {
              return (
                <div key={data} className={`recipe-extra-info-each ${title}`}>
                  {data}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
