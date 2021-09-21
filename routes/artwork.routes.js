const router = require("express").Router();
const Art = require("../models/Art.model");
const ArtModel = require("../models/Art.model");
const fileUploader = require("../middlewares/cloudinary.config");
const User = require("../models/User.model");
const { isLoggedIn } = require("../middlewares/auth-middlewares");

// GET artworks/overview
router.get("/overview", (req, res, next) => {
  res.render("artworks/overview.hbs");
});

// GET artworks/list
router.get("/list/:category", (req, res, next) => {
  const { category } = req.params;
  Art.find( { category: category} )
    .then((arts) => {
      res.render("artworks/list.hbs", { arts });
    })
    .catch((err) => {});
});

// GET artworks/upload
router.get("/upload", isLoggedIn, (req, res, next) => {
  const artwork = [
    "Graffiti",
    "Sticker",
    "Urban Knitting",
    "Graphic Poster",
    "Paper Works",
    "Mosaic",
    "Stencil",
  ];
  res.render("artworks/upload.hbs", { artwork });
});

// POST artworks/upload
router.post("/upload", isLoggedIn, fileUploader.single("artworkImage"),
  (req, res, next) => {
    // Add a new artwork
    const { category, artist, titleOfArtwork, date, location, description } = req.body;
    console.log(req.file.path);
    Art.create({
      category,
      artist,
      titleOfArtwork,
      date,
      location,
      description,
      artworkImage: req.file.path,
      uploadedBy: req.session.loggedInUser._id,
    })
      .then((arts) => {
        console.log("Here is the new artwork you have spotted.", arts);
        res.redirect("/artworks/overview");
      })
      .catch((err) => {
        console.log("An error has occured while uploading an artwork.");
      });
  }
);

// GET details/:id
// renders the details of the uploaded artwork that has an unique ID in the DB

router.get("/details/:artworkId", (req, res, next) => {
  const { artworkId } = req.params;
  Art.findById(artworkId)
  .populate("uploadedBy")
    .then((singleArtworkFromDB) => {
      console.log("Show me what you get:", singleArtworkFromDB)
      let username = singleArtworkFromDB.uploadedBy.username
      delete singleArtworkFromDB.uploadedBy
      res.render("artworks/details.hbs", { singleArtworkFromDB, username});
    })
    .catch((err) => {
      console.log(err);
    });
});

// GET details/:id -> update the details of the artwork

router.get("/details/:artworkId/update", isLoggedIn, (req, res, next) => {
  const { artworkId } = req.params;
  const artwork = [
    "Graffiti",
    "Sticker",
    "Urban Knitting",
    "Graphic Poster",
    "Paper Works",
    "Mosaic",
    "Stencil",
  ];
  Art.findById(artworkId)
    .then((singleArtworkFromDB) => {
      console.log("Here is your updated artwork.", singleArtworkFromDB);
      res.render("artworks/update.hbs", { singleArtworkFromDB, artwork });
    })
    .catch((err) => {
      console.log("An error has occured while updating an artwork.");
    });
});

// ggf. redirect austauschen zu "details"

router.post("/details/:artworkId/update", isLoggedIn, (req, res, next) => {
  const { artworkId } = req.params;
  const { category, artist, titleOfArtwork, date, location, description } = req.body;
  Art.findByIdAndUpdate(
    artworkId,
    { category, artist, titleOfArtwork, date, location, description },
    { new: true }
  )
    .then((singleArtworkFromDB) => {
      console.log(
        "Here is the new artwork you have updated.",
        singleArtworkFromDB
      );
      res.redirect("/artworks/overview");
    })
    .catch((err) => {
      console.log("An error has occured while updating a new artwork.");
    });
});

// router.post -> delete an artwork

router.post("/details/:artworkId/delete", isLoggedIn, (req, res, next) => {
  const { artworkId } = req.params;
  Art.findByIdAndDelete(artworkId)
    .then(() => {
      res.redirect("/overview");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
