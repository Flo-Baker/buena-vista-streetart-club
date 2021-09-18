const router = require("express").Router();
const Artist = require("../models/Artist.model");
const ArtistModel = require("../models/Artist.model");

// GET artists/list
router.get("/list", (req, res, next) => {
  res.render("artists/list.hbs");
});

// GET details/:id
// renders the details of the uploaded artist that has an unique ID in the DB

router.get("/details/:artistId", (req, res, next) => {
  const { artistId } = req.params;
  Artist.findById(artistId)
    .then((singleArtistFromDB) => {
      res.render("artists/details.hbs", singleArtistFromDB);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
