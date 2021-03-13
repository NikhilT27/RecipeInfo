var express = require("express");
var router = express.Router();
var axios = require("axios").default;
const SavedRecipe = require("../models/SavedRecipe");
const checkAuth = require("../util/check-auth");

router.post("/saveRecipe", async function (req, res, next) {
  console.log(req.body);
  let headers = req.headers;

  try {
    const user = checkAuth(headers);

    const newSaveRecipe = new SavedRecipe({
      email: user.email,
      user: user.id,
      recipe: req.body.recipe,
    });

    const savedRecipe = await newSaveRecipe.save();
    console.log(savedRecipe);
    res.send(savedRecipe);
  } catch (error) {
    throw new Error(error);
  }

  res.send(req.body);
});

router.get("/getSavedRecipes", async function (req, res, next) {
  let headers = req.headers;
  try {
    const user = checkAuth(headers);
    const recipesData = await SavedRecipe.find({ email: user.email });
    if (recipesData) {
      res.send(recipesData);
    }
  } catch (error) {
    throw new Error(error);
  }
});

router.delete("/deleteSavedRecipe", async function (req, res, next) {
  let headers = req.headers;
  try {
    const user = checkAuth(headers);
    const response = await SavedRecipe.deleteOne({
      email: user.email,
      _id: req.body.id,
    });
    if (response) {
      res.send(response);
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
