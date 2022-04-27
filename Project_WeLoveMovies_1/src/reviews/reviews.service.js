const knex = require("../db/connection");

const getReview = (reviewId) => {
  return knex("reviews").select("*").where({ "reviews.review_id": reviewId });
};

const deleteReview = (reviewId) => {
  return knex("reviews").where({ "reviews.review_id": reviewId }).del();
};

const updateReview = (updatedReview) => {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*");
};

module.exports = { deleteReview, getReview, updateReview };
