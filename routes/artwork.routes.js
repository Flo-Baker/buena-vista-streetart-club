const router = require("express").Router();
const Art = require("../models/Art.model");
const ArtModel = require("../models/Art.model");
const fileUploader = require("../middlewares/cloudinary.config");

// GET artworks/overview
router.get("/overview", (req, res, next) => {
    res.render("artworks/overview.hbs");
  });

// GET artworks/list 
router.get("/list", (req, res, next) => {
    res.render("artworks/list.hbs");
  });

router.get("/overview", (req, res, next) => {
  res.render("artworks/overview.hbs");
});

// GET artworks/upload 
router.get("/upload", (req, res, next) => {
    const artwork = [ 'Graffiti', 'Sticker', 'Urban Knitting', 'Graphic Poster', 'Paper Works', 'Mosaic', 'Stencil' ];
    res.render("artworks/upload.hbs", {artwork});
  });

// POST artworks/upload
router.post("/upload", fileUploader.single("artworkImage"), (req, res, next) => {
    // Add a new artwork
    const { category, artist, date, location, description } = req.body;
    console.log(req.file.path);
    Art.create({ category, artist, date, location, description, artworkImage: req.file.path })
      .then((arts) => {
        console.log("Here is the new artwork you have spotted.", arts);
        res.redirect("/artworks/overview");
      })
      .catch((err) => {
        console.log("An error has occured while uploading an artwork.");
      });
  });

// GET details/:id  
// renders the details of the uploaded artwork that has an unique ID in the DB

router.get("/details/:artworkId", (req, res, next) => {
 const { artworkId }  = req.params;
 Art.findById(artworkId)
 .then((singleArtworkFromDB) => {
   res.render("artworks/details.hbs", singleArtworkFromDB)
 }).catch((err) => {
  console.log(err);
 });
  });

// GET details/:id -> update the details of the artwork

router.get("/details/:artworkId/update", (req, res, next) => {
  const { artworkId } = req.params;
  Art.findById(artworkId)
  .then((singleArtworkFromDB) => {
    console.log("Here is your updated artwork.", singleArtworkFromDB);
    res.render("artworks/update.hbs", {singleArtworkFromDB});
  })
  .catch((err) => {
    console.log("An error has occured while updating an artwork.");
  });
});

// ggf. redirect austauschen zu "details"

router.post("/details/:artworkId/update", (req, res, next) => {
  const { artworkId } = req.params;
  const { category, artist, date, location, description } = req.body;
  Art.findByIdAndUpdate(artworkId, {category, artist, date, location, description}, {new: true} )
    .then((singleArtworkFromDB) => {
      console.log("Here is the new artwork you have updated.", singleArtworkFromDB);
      res.redirect("/artworks/list");
    })
    .catch((err) => {
      console.log("An error has occured while updating a new artwork.");
    });
});

// router.post -> delete an artwork

router.post("/details/:artworkId/delete", (req, res, next) => {
  const { artworkId } = req.params;
  Art.findByIdAndDelete(artworkId)
  .then(() => {
    res.redirect("/list");
  })
  .catch((err) => {
    console.log(err);
    });
});

module.exports = router;