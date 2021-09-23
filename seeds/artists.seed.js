const mongoose = require("mongoose");

// import our artist model
const Artist = require("../models/Artist.model");

// creating the array of objects with data of the artist model
const artist = [
  {
    artistName: "El Bocho",
    countryOfOrigin: "Germany",
    shortVita:
      "El Bocho started his street art projects in 1997. He worked as an illustrator for the newspaper Frankfurter Allgemeine and now calls Berlin his home. The artist using graphic posters to tell his stories. His most famous characters are Little Lucy, xxx, xxx.",
  },
  { artistName: "SP38", countryOfOrigin: "France", shortVita: "bla" },
  { artistName: "bla", countryOfOrigin: "bla", shortVita: "bla" },
];

/* create method needs a promise
Drone.create(drones)
  .then((createdDrones) => {
    console.log(`${drones.length} drones have been created.`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(“An error has occured while creating drones”);
  });*/
