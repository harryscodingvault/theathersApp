const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Utils
const reviewExist = async (req, res, next) => {
  const { reviewId } = req.params;

  const review = await service.getReview(reviewId);
  if (review.length > 0) {
    res.locals.review = review[0];
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
  if (Object.keys(bodyData).length === 0) {
    return next({ status: 404, message: `Object is empty` });
  }
  const updatedReview = {
    ...bodyData,
    review_id: res.locals.review.review_id,
  };
  const updatedData = await service.updateReview(updatedReview);
  const data = await service.getReviewAndCritic(updatedData[0].review_id);
  const formattedData = {
    review_id: data[0].review_id,
    content: data[0].content,
    score: data[0].score,
    created_at: data[0].created_at,
    updated_at: data[0].updated_at,
    critic_id: data[0].critic_id,
    movie_id: data[0].movie_id,
    critic: {
      critic_id: data[0].critic_id,
      preferred_name: data[0].preferred_name,
      surname: data[0].surname,
      organization_name: data[0].organization_name,
      created_at: data[0].critics_created_at,
      updated_at: data[0].critics_updated_at,
    },
  };

  res.status(201).json({ data: formattedData });
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
