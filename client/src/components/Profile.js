import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const [savedRecipes, setSavedRecipes] = useState({});
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const token = localStorage.getItem("authToken");
    const response = await axios.get("/recipe/getSavedRecipes", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response) {
      console.log(response.data);
      setSavedRecipes(response.data);
    }
  }

  async function deleteRecipe(id) {
    const token = localStorage.getItem("authToken");
    const response = await axios.delete(`/recipe/deleteSavedRecipe/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response) {
      console.log(response.data);
      getData();
    }
  }

  return (
    <>
      <Link to="/home">
        <div className="profile-back"></div>
      </Link>
      <div className="profile-detail">
        <div className="profile-image"></div>
        <div className="profile-info">
          <div className="profile-title">Id</div>
          <div className="profile-title" style={{ fontWeight: 700 }}>
            Name
          </div>
          <div className="profile-title">Email</div>
        </div>
      </div>
      <div className="profile-saved">
        <div className="profile-title" style={{ fontWeight: 700 }}>
          Saved
        </div>
        {Object.keys(savedRecipes).length === 0 &&
        savedRecipes.constructor === Object ? (
          <div></div>
        ) : (
          savedRecipes.map(({ _id, recipe }) => {
            let { label, image } = recipe;
            return (
              <div className="profile-each">
                <img src={image} alt={label} className="profile-each-img" />
                <div className="profile-each-title">{label}</div>
                <div
                  className="profile-each-delete"
                  onClick={() => deleteRecipe(_id)}
                ></div>
              </div>
            );
          })
        )}
      </div>
      <div className="profile-logout">
        <div className="profile-logout-button">Logout</div>
      </div>
    </>
  );
}
