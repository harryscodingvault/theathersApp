const knex = require("../db/connection");

const getReview = (reviewId) => {
  return knex("reviews").select("*").where({ "reviews.review_id": reviewId });
};

const deleteReview = (reviewId) => {
  return knex("reviews").where({ "reviews.review_id": reviewId }).del();
};

module.exports = { deleteReview, getReview };
