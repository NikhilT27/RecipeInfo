const { model, Schema } = require("mongoose");

const historySchema = new Schema({
  email: String,
  recipes: [String],
});

module.exports = model("SavedRecipe", historySchema);
