const knex = require("../db/connection");

const getReview = (reviewId) => {
  return knex("reviews")
    .select("*")
    .whereRaw(`reviews.review_id = ${reviewId} `)
    .first();
};

const getReviewAndCritic = (reviewId) => {
  return knex("reviews")
    .join("critics", "critics.critic_id", "reviews.review_id")
    .select(
      "reviews.*",
      "critics.preferred_name",
      "critics.surname",
      "critics.organization_name",
      "critics.created_at as critics_created_at",
      "critics.updated_at as critics_updated_at"
    )
    .whereRaw(`reviews.review_id = ${reviewId}`)
    .first();
};

const getCritic = (criticId) => {
  return knex("critics")
    .select("*")
    .whereRaw(`critics.critic_id = ${criticId}`)
    .first();
};

const deleteReview = (reviewId) => {
  return knex("reviews").where({ "reviews.review_id": reviewId }).del();
};

const updateReview = (updatedReview) => {
  return knex("reviews")
    .select("*")
    .whereRaw(`reviews.review_id = ${updatedReview.review_id}`)
    .update(updatedReview, "*");
};

module.exports = {
  deleteReview,
  getReview,
  updateReview,
  getReviewAndCritic,
  getCritic,
};
