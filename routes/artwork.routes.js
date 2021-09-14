const router = require("express").Router();
const Art = require("../models/Art.model");
const ArtModel = require("../models/Art.model");

// GET artworks/overview
router.get("/overview", (req, res, next) => {
    res.render("artworks/overview.hbs");
  });

// GET artworks/list 
router.get("/list", (req, res, next) => {
    res.render("artworks/list.hbs");
  });

// GET artworks/upload 
router.get("/upload", (req, res, next) => {
    const artwork = [ 'Graffiti', 'Sticker', 'Urban Knitting', 'Graphic Poster', 'Paper Works', 'Mosaic', 'Stencil' ];
    res.render("artworks/upload.hbs", {artwork});
  });

// POST artworks/upload
router.post("/upload", (req, res, next) => {
    // Add a new artwork
    const { category, artist, date, location, artworkImage } = req.body;
    Art.create({ category, artist, date, location, artworkImage })
      .then((art) => {
        console.log("Here is the new artwork you have spotted.", art);
        res.redirect("/overview");
      })
      .catch((err) => {
        console.log("An error has occured while uploading an artwork.");
      });
  });



module.exports = router;