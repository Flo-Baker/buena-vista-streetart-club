const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth-middlewares");
const Art = require("../models/Art.model");

router.get("/", isLoggedIn, (req, res, next) => {
  console.log("this is the session", req.session.loggedInUser);

  Art.find({ uploadedBy: req.session.loggedInUser._id })
    .then((arts) => {
      res.render("users/profile.hbs", { user: req.session.loggedInUser, arts });
    })

    .catch((err) => {});
});

module.exports = router;
