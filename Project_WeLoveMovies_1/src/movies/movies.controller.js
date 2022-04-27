const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Utils
const movieExist = async (req, res, next) => {
  const { movieId } = req.params;

  const movie = await service.getMovie(movieId);
  if (movie) {
    res.locals.movie = movie;
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

module.exports = {
  list: asyncErrorBoundary(list),
  getMovie: [asyncErrorBoundary(movieExist), asyncErrorBoundary(getMovie)],
};
