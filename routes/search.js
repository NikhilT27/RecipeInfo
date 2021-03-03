var express = require("express");
var router = express.Router();
var axios = require("axios").default;

router.get("/", async function (req, res, next) {
  console.log(req.query);

  try {
    var options = {
      method: "GET",
      url: "https://edamam-recipe-search.p.rapidapi.com/search",
      params: req.query,
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": "edamam-recipe-search.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        res.send(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
