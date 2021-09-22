const router = require("express").Router();
const UserModel = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const fileUploader = require("../middlewares/cloudinary.config");

// GET signup
router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

// POST signup
router.post("/signup", fileUploader.single("imageUrl"), (req, res, next) => {
  console.log(req.body);
  console.log("The image upload was:", req.file);
  const { firstName, lastName, email, username, password } = req.body;

  // 1. Backend validators
  // 1.1 check if user fills out required parts of the form (if not => errorMessage)
  if ( !firstName || !lastName || !email || !password || !req.file.path ) {
    res.render("auth/signup.hbs", {
      errorMessage:
        "Please fill out required parts of the form and don't forget to add a picture.",
    });
    return;
  }

  // 1.2 checking if username field is filled out, if it is not -> create username with firstName lastName

  if (!username) {
    username = firstName + lastName;
  }

  // 1.3 email-regex to check if the address is a validated email
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    res.render("auth/signup.hbs", {
      errorMessage: "Please enter a valid email.",
    });
    return;
  }

  // 1.4 password-regex to check if password is safe enough (based on our definition)

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
    res.render("auth/signup.hbs", {
      errorMessage:
        "Password is not strong enough. Needs uppercase, lowercase and at least 8 characters!",
    });
    return;
  }

  // 1.5 check if user with that unique email already exists

  UserModel.findOne({ email })
    .then((user) => {
      if (user) {
        res.render("auth/signup.hbs", {
          errorMessage:
            "Email is already taken, please choose another valid email!",
        });
      } else {
        // 2. encrypt password for security
        const salt = bcryptjs.genSaltSync(12);
        const hashedPassword = bcryptjs.hashSync(password, salt);
        console.log(hashedPassword);

        // 3. create user in db with hashedPassword
        UserModel.create({
          firstName,
          lastName,
          email,
          username,
          password: hashedPassword,
          profilePicture: req.file.path,
        })
          .then(() => {
            res.redirect("/auth/login");
          })
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => {
      next(err);
    });
});

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
        // to check if user and pw match -> authenticate the user
        if (passwordCheck) {
          req.session.loggedInUser = user;

          // create the global variable to lead the private user site (profile)
          req.app.locals.isLoggedIn = true;

          // if everythings fine -> user gets to private profile
          res.redirect("/profile");

          // if the pw does not exist || if the user cannot be found
        } else {
          res.render("auth/login.hbs", {
            errorMessage: "Wrong password, please try again.",
          });
        }
      } else {
        res.render("auth/signup.hbs", {
          errorMessage:
            "Username not found, please create your profile. Thanks.",
        });
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
