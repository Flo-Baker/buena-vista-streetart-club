const mongoose = require("mongoose");

// import our artist model
const Artist = require("../models/Artist.model");

require("../db");

// creating the array of objects with data of the artist model
const artist = [
  {
    artistName: "El Bocho",
    countryOfOrigin: "Germany",
    shortVita:
      "El Bocho started his street art projects in 1997. He worked as an illustrator for the newspaper Frankfurter Allgemeine and now calls Berlin his home. The artist using graphic posters to tell his stories. His most famous characters are Little Lucy, Poor Hannah, Berlin Women.",
  },
  {
    artistName: "SP38",
    countryOfOrigin: "France",
    shortVita:
      "Sylvain Perier, known as SP38, is a French painter, street artist, billsticker and performer. He was born in 1960 in Normandy, France, and studied art at the Fine Arts School in Cherbourg. In  1995, SP moved to Berlin. His trademark is his recurring typography and his short concise slogans and composed words in English or French that transport certain themes.",
  },
  {
    artistName: "C215",
    countryOfOrigin: "France",
    shortVita:
      "Born in 1973 as Christian Guémy, the Paris-based French street artist known as C215 has swiftly moved in to being one of the top stencil artists in the world. C215's subjects are typically those such as beggars, homeless people, refugees, street kids and the elderly. The rationale behind this choice of subject is to draw attention to those that society has forgotten about.",
  },
  {
    artistName: "Fratze",
    countryOfOrigin: "Germany",
    shortVita:
      "An artist from the Ruhrpott, who makes the world a little more colorful with small fine stickers.",
  },
  {
    artistName: "Xoooox",
    countryOfOrigin: "Germany",
    shortVita:
      "XOOOOX (pronounced “zooks”, the true identity behind the pseudonym remains unknown) was born 1979 and started with classical graffiti at the age of 15. He is a Berlin based Street-artist known for guerrilla-style who works with delicate stenciled works and installations in an Arte Povera style that consist of weathered and decaying materials",
  },
  {
    artistName: "ROA",
    countryOfOrigin: "Belgium",
    shortVita:
      "Roa is a graffiti artist hailing from Ghent, Belgium. His works of art, some of quite formidable size, grace the international scene. Roa’s signature style features depictions of animals, birds and different forms of wildlife.",
  },
  {
    artistName: "HERAKUT",
    countryOfOrigin: "Germany",
    shortVita:
      "Hera (Jasmin Siddiqui) and Akut (Falk Lehmann) are a German street art duo who have worked together to create the most memorable style of art. The art form they have adopted is mainly to do with storytelling and the creation of imaginary worlds.",
  },
  {
    artistName: "MATA HAARIG",
    countryOfOrigin: "Germany",
    shortVita: "Textile entanglements and woolly creations for public spaces.",
  },
  {
    artistName: "Invader",
    countryOfOrigin: "France",
    shortVita:
      "Anonymous. Since 1998 a large scale project called Space Invaders. Little by little, international densely populated urban areas were invaded. The goal is to increase the score by continuously and restlessly invading new spaces, 20 - 50 pieces by city.",
  },
  {
    artistName: "unknown",
    countryOfOrigin: "not clear",
    shortVita: "Just because I liked it.",
  },
];

Artist.create(artist)
  .then((responseFromDB) => {
    console.log("Response from Database", responseFromDB);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log("An error has occured while creating artist");
  });