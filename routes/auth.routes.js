const router = require("express").Router();
const UserModel = require("../models/User.model");
// const bcrypt = require('bcryptjs')

/*
// GET signup
router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

// POST signup
router.post("/signup", (req, res, next) => {
  console.log(req.body);
  console.log('image upload:', req.file)
  const { firstName, lastName, email, username, password, profilePicture } = req.body;

});
*/

// GET login
router.get("/login", (req, res, next) => {
  res.render("auth/login.hbs");
});

// POST login
router.post("/login", (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;

  // 1. Backend validators

  // 1.1 -> check if not empty, if it is render same page (auth/login) + error message for user

  if (!email || !password) {
    res.render("auth/login.hbs", {
      errorMessage: "You need to fill out the whole form.",
    });
    return;
  }

  // 1.2 -> check if user exists in db

  UserModel.findOne({ email })
    .then((user) => {
      if (user) {
        // to check if user exists in db
        const passwordCheck = bcryptjs.compareSync(password, user.password);
        console.log("Check for Password");
      }
      // to check if user and pw match -> authenticate the user
      if (passwordCheck) {
        req.session.loggedInUser = user;

        // create the global variable to lead the private user site (profile)
        req.app.locals.isLoggedIn = true;

        // if everythings fine -> user gets to private profile
        res.redirect("/profile");

        // if the pw does not exist || if the user cannot be found
      } else {
        res.render(
          "auth/login.hbs",
          { errorMessage: "Wrong password, please try again." } ||
            res.render("auth/signup.hbs", {
              errorMessage:
                "Username not found, please create your profile. Thanks.",
            })
        );
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/logout", (req, res, next) => {
  // to end the session of a user we need to "destroy" it
  req.session.destroy();
  // when session is over -> redirect to homepage
  res.redirect("/");
});

module.exports = router;
