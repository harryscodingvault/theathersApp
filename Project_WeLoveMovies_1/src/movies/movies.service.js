const knex = require("../db/connection");
const db = require("../db/connection");

const list = () => {
  return knex("movies").select("*");
};

const listShowing = (is_showing) => {
  return knex("movies")
    .join("movies_theaters", "movies_theaters.movie_id", "movies.movie_id")
    .select(
      "movies.movie_id as id",
      "movies.title",
      "movies.runtime_in_minutes",
      "movies.rating",
      "movies.description",
      "movies.image_url",
      "movies_theaters.is_showing as is_showing"
    )
    .distinct("movies.movie_id")
    .whereRaw("movies_theaters.is_showing = true");
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

const getReviews = (movieId) => {
  return knex("movies")
    .join("reviews", "reviews.movie_id", "movies.movie_id")
    .join("critics", "critics.critic_id", "reviews.critic_id")
    .select(
      "reviews.*",
      "critics.critic_id as critics_critic_id",
      "critics.preferred_name",
      "critics.surname",
      "critics.organization_name",
      "critics.created_at as critics_created_at",
      "critics.updated_at as critics_updated_at"
    )
    .where({ "reviews.movie_id": movieId });
};

module.exports = { list, listShowing, getMovie, getTheaters, getReviews };
