const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Utils
const movieExist = async (req, res, next) => {
  const { movieId } = req.params;

  const movie = await service.getMovie(movieId);
  if (movie.length) {
    res.locals.movie = movie[0];
    return next();
  }
  return next({ status: 404, message: `Movie cannot be found.` });
};

// Route Functions
const list = async (req, res) => {
  const is_showing = req.query.is_showing;
  let data = {};
  if (is_showing == "true") {
    data = await service.listShowing();
  } else {
    data = await service.list();
  }

  res.json({ data });
};

const getMovie = async (req, res) => {
  res.json({ data: res.locals.movie });
};

const getTheaters = async (req, res) => {
  const data = await service.getTheaters(res.locals.movie.movie_id);

  res.json({ data: data });
};

const getReviews = async (req, res) => {
  const data = await service.getReviews(res.locals.movie.movie_id);
  res.json({ data: data });
};

module.exports = {
  list: asyncErrorBoundary(list),
  getMovie: [asyncErrorBoundary(movieExist), asyncErrorBoundary(getMovie)],
  getTheaters: [
    asyncErrorBoundary(movieExist),
    asyncErrorBoundary(getTheaters),
  ],
  getReviews: [asyncErrorBoundary(movieExist), asyncErrorBoundary(getReviews)],
};
