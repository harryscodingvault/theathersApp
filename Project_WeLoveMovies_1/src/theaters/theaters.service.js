const knex = require("../db/connection");

const list = () => {
  return knex("theaters")
    .join(
      "movies_theaters",
      "movies_theaters.theater_id",
      "theaters.theater_id"
    )
    .join("movies", "movies.movie_id", "movies_theaters.movie_id")
    .select(
      "theaters.*",
      "movies.movie_id as movies_movie_id",
      "movies.title as title",
      "movies.runtime_in_minutes as movies_runtime_in_minutes",
      "movies.rating as movies_rating",
      "movies.description as movies_description",
      "movies.image_url as movies_image_url",
      "movies.created_at as movies_created_at",
      "movies.updated_at as movies_updated_at",
      "movies_theaters.is_showing as movies_is_showing",
      "movies_theaters.theater_id as movies_theater_id"
    );
};

module.exports = { list };
