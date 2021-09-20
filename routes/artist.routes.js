const router = require("express").Router();
const Artist = require("../models/Artist.model");
const ArtistModel = require("../models/Artist.model");

// GET artists/list
/*router.get("/list", (req, res, next) => {
  res.render("artists/list.hbs");
});*/

router.get("/list", (req, res, next) => {
  Artist.find()
    .then((artists) => {
      console.log("Here is the list of all artists", artists);
      res.render("artists/list.hbs", { artists });
    })
    .catch((err) => {
      console.log("An error occured while listing all the artists.");
    });
});

// router.get is only to show the form to create an artist

router.get("/create", (req, res, next) => {
  res.render("artists/create.hbs");
});

router.post("/create", (req, res, next) => {
  const { artistName, countryOfOrigin, shortVita } = req.body;
  Artist.create({ artistName, countryOfOrigin, shortVita })
    .then((artists) => {
      console.log("Here is the new artist you have created.", artists);
      res.redirect("/artists/list");
    })
    .catch((err) => {
      console.log("An error has occured while creating a new artist.");
    });
});

// GET details/:id
// renders the details of the uploaded artist that has an unique ID in the DB

router.get("/details/:artistId", (req, res, next) => {
  const { artistId } = req.params;
  Artist.findById(artistId)
    .then((singleArtistFromDB) => {
      res.render("artists/details.hbs", { singleArtistFromDB });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/details/:artistId/update", (req, res, next) => {
  const { artistId } = req.params;
  Artist.findById(artistId)
    .then((singleArtistFromDB) => {
      console.log("Here is your updated artist.", singleArtistFromDB);
      res.render("artists/update.hbs", { singleArtistFromDB });
    })
    .catch((err) => {
      console.log("An error has occured while updating an artist.");
    });
});

router.post("/details/:artistId/update", (req, res, next) => {
  const { artistId } = req.params;
  const { artistName, countryOfOrigin, shortVita } = req.body;
  Artist.findByIdAndUpdate(
    artistId,
    { artistName, countryOfOrigin, shortVita },
    { new: true }
  )
    .then((singleArtistFromDB) => {
      console.log(
        "Here is the new artist you have updated.",
        singleArtistFromDB
      );
      res.redirect("/artists/list");
    })
    .catch((err) => {
      console.log("An error has occured while updating a new artist.");
    });
});

// router.post -> delete an artist

router.post("/details/:artistId/delete", (req, res, next) => {
  const { artistId } = req.params;
  Artist.findByIdAndDelete(artistId)
    .then(() => {
      res.redirect("/artists/list");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
