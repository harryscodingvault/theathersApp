const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const list = async (req, res) => {
  const is_showing = req.query.is_showing;
  let data = {};
  if (is_showing == "true") {
    data = await service.listShowing();
  } else {
    data = await service.list();
  }

  res.json({ data });
};

const list_showing_movies = async (req, res) => {
  const { query } = req.params;
  const data = await service.listShowing();
  console.log("list_showing_movies");
  res.json("lol");
};

module.exports = {
  list: asyncErrorBoundary(list),
  list_showing_movies: asyncErrorBoundary(list_showing_movies),
};
