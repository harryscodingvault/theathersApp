if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");

app.use(express.json());
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

app.use(notFound);
app.use(errorHandler);

// Test router
const test = async () => {
  const previous = await knex("posts").first();
  console.log(previous);
};

module.exports = app;
