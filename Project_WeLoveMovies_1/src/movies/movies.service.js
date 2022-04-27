const knex = require("../db/connection");

const list = () => {
  return knex("movies").select("*");
};

const listShowing = () => {
  return knex("movies")
    .join("movies_theaters", "movies_theaters.movie_id", "movies.movie_id")
    .distinctOn("movies.movie_id")
    .select("movies.*")
    .where({ "movies_theaters.is_showing": "true" });
};

const getMovie = (movieId) => {
  return knex("movies").select("*").where({ "movies.movie_id": movieId });
};

const getTheaters = (movieId) => {
  return knex("movies_theaters")
    .join("theaters", "movies_theaters.theater_id", "theaters.theater_id")
    .select("theaters.*")
    .where({ "movies_theaters.movie_id": movieId });
};

module.exports = { list, listShowing, getMovie, getTheaters };
