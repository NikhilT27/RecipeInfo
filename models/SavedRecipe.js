const { model, Schema } = require("mongoose");

const savedRecipeSchema = new Schema({
  email: String,
  user: String,
  recipe: Schema.Types.Mixed,
});

module.exports = model("SavedRecipe", savedRecipeSchema);
