const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Utils
const reviewExist = async (req, res, next) => {
  const { reviewId } = req.params;

  const review = await service.getReview(reviewId);
  if (review.length) {
    res.locals.review = review[0];
    return next();
  }
  return next({ status: 404, message: `Review cannot be found.` });
};

// Route Functions
const deleteReview = async (req, res) => {
  await service.deleteReview(res.locals.review.review_id);
  res.sendStatus(204);
};

const updateReview = async (req, res) => {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const data = await service.updateReview(updatedReview);

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