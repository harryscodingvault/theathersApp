const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Utils
const reviewExist = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await service.getReview(reviewId);
  if (review && reviewId) {
    res.locals.review = review;
    return next();
  }
  return next({ status: 404, message: `Review cannot be found.` });
};

// Route Functions
const deleteReview = async (req, res, next) => {
  await service.deleteReview(res.locals.review.review_id);
  res.sendStatus(204);
};

const updateReview = async (req, res, next) => {
  const bodyData = req.body.data;

  const updatedReview = {
    ...res.locals.review,
    ...bodyData,
    review_id: res.locals.review.review_id,
  };

  const critic = await service.getCritic(res.locals.review.critic_id);

  const updatedData = await service.updateReview(updatedReview);

  const data = {
    review_id: res.locals.review.review_id,
    content: bodyData.content || res.locals.review.content,
    score: bodyData.score || res.locals.review.score,
    created_at: res.locals.review.created_at,
    updated_at: res.locals.review.updated_at,
    critic_id: res.locals.review.critic_id,
    movie_id: res.locals.review.movie_id,
    critic: {
      critic_id: critic.critic_id,
      preferred_name: critic.preferred_name,
      surname: critic.surname,
      organization_name: critic.organization_name,
      created_at: critic.created_at,
      updated_at: critic.updated_at,
    },
  };

  res.status(201).json({ data: data });
};

module.exports = {
  deleteReview: [
    asyncErrorBoundary(reviewExist),
    asyncErrorBoundary(deleteReview),
  ],
  updateReview: [
    asyncErrorBoundary(reviewExist),
    asyncErrorBoundary(updateReview),
  ],
};
