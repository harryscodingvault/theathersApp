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
  if (is_showing) {
    data = await service.listShowing(String(is_showing));
  } else {
    data = await service.list();
  }

  res.json({ data: data });
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
  const formatedData = data.map((item) => {
    return {
      review_id: item.review_id,
      content: item.content,
      score: item.score,
      created_at: item.created_at,
      updated_at: item.updated_at,
      critic_id: item.critic_id,
      movie_id: item.movie_id,
      critic: {
        critic_id: item.critics_critic_id,
        preferred_name: item.preferred_name,
        surname: item.surname,
        organization_name: item.organization_name,
        created_at: item.critics_created_at,
        updated_at: item.critics_updated_at,
      },
    };
  });
  res.json({ data: formatedData });
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
