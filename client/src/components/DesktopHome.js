import React, { useState, useEffect } from "react";
import profile from "../images/hero.jpg";
import logo from "../images/logo.svg";
import axios from "axios";
import Recipe from "../components/Recipe";
import Loading from "../components/Loading";

import { useHistory } from "react-router-dom";

export default function DesktopHome() {
  const [user, setUser] = useState({});
  const [recipes, setRecipes] = useState({});
  const [savedRecipes, setSavedRecipes] = useState({});
  const [searchData, setSearchData] = useState("Indian");
  const history = useHistory();

  useEffect(() => {
    getUser();
    getData(searchData);
    getSavedRecipesData();
  }, []);

  async function getUser() {
    const token = localStorage.getItem("authToken");
    const response = await axios.get("/users/getUser", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response) {
      setUser(response.data);
      // console.log(user);
    }
  }

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

  async function getSavedRecipesData() {
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
      getSavedRecipesData();
    }
  }

  function logout() {
    localStorage.removeItem("authToken");
    history.push("/");
    setTimeout(history.go(0), 3000);
  }

  return (
    <div className="desktop-home">
      <div className="desktop-info">
        <div className="desktop-logo">
          <div className="desktop-logo-image-box">
            <img src={logo} className="desktop-logo-image" />
          </div>

          <div className="desktop-logo-title">
            Recipe<span style={{ color: "#f5ce32" }}>Info</span>
          </div>
        </div>
        <div className="desktop-savedRecipes-title">Saved Recipes</div>
        <div className="desktop-savedRecipes">
          {Object.keys(savedRecipes).length === 0 &&
          savedRecipes.constructor === Object ? (
            <div></div>
          ) : (
            savedRecipes.map(({ _id, recipe }) => {
              let { label, image } = recipe;
              return (
                <div key={_id} className="desktop-savedRecipes-each">
                  <img
                    src={image}
                    alt={label}
                    className="desktop-savedRecipes-each-image"
                  />
                  <div className="desktop-savedRecipes-each-title">{label}</div>
                  <div
                    className="desktop-savedRecipes-each-delete profile-each-delete"
                    onClick={() => deleteRecipe(_id)}
                  ></div>
                </div>
              );
            })
          )}
        </div>
        <div className="desktop-profile">
          <img src={profile} className="desktop-profile-image" />
          <div className="desktop-profile-name">{user.name}</div>
          <div className="desktop-profile-id">{user.id}</div>
          <div className="desktop-profile-email">{user.email}</div>
          <div className="desktop-profile-logout" onClick={() => logout()}>
            Logout
          </div>
        </div>
      </div>
      <div className="desktop-content">
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
        <div className="data-title">Popular Recipes</div>
        {Object.keys(recipes).length === 0 && recipes.constructor === Object ? (
          <div className="spinner-box">
            <Loading />
          </div>
        ) : (
          <div className="data-recipes-box">
            {recipes.hits.map(({ recipe }, index) => {
              return <Recipe key={recipe.label + index} data={recipe} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
