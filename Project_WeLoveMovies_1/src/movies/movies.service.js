const knex = require("../db/connection");

const list = () => {
  return knex("movies").select("*");
};

const listShowing = () => {
  return knex("movies")
    .join("movies_theaters", "movies_theaters.movie_id", "movies.movie_id")
    .distinctOn("movies.movie_id")
    .select("movies.movie_id")
    .where({ "movies_theaters.is_showing": "true" });
};

const getMovie = (movieId) => {
  return knex("movies").select("*").where({ "movies.movie_id": movieId });
};

module.exports = { list, listShowing, getMovie };
