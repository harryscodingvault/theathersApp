const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const reduceProperties = require("../utils/reduce-properties");

// Route Functions
const list = async (req, res) => {
  const data = await service.list();
  const reduceTheaterAndMovies = reduceProperties("theater_id", {
    movies_movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    movies_runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    movies_rating: ["movies", null, "rating"],
    movies_description: ["movies", null, "description"],
    movies_image_url: ["movies", null, "image_url"],
    movies_created_at: ["movies", null, "created_at"],
    movies_updated_at: ["movies", null, "updated_at"],
    movies_is_showing: ["movies", null, "is_showing"],
    movies_theater_id: ["movies", null, "theater_id"],
  });

  res.status(201).json({ data: reduceTheaterAndMovies(data) });
};

module.exports = {
  list: asyncErrorBoundary(list),
};
