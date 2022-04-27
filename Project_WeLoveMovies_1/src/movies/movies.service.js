const knex = require("../db/connection");

const list = () => {
  return knex("movies").select("*");
};

const listShowing = () => {
  return knex("movies").select("*");
};

module.exports = { list };
