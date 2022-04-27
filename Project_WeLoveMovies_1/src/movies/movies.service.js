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

module.exports = { list, listShowing };
