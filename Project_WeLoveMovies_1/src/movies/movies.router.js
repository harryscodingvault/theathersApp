const router = require("express").Router({ mergeParams: true });

const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);
router
  .route("/movies?is_showing=true")
  .get(controller.list_showing_movies)
  .all(methodNotAllowed);

module.exports = router;
