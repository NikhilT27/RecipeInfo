const { model, Schema } = require("mongoose");

const savedRecipeSchema = new Schema({
  email: String,
  recipes: [Schema.Types.Mixed],
});

module.exports = model("SavedRecipe", savedRecipeSchema);
