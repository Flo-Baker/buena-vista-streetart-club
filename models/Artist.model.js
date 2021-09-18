const { Schema, model } = require("mongoose");

const artistSchema = new Schema({
  artistName: {
    type: String,
    // enum: [ 'Xoooox', 'Banksy', 'C215', '1UP', 'El Bocho', 'SOBR', 'Gregos', 'Invader', 'Alias', 'SP38', 'Mein Lieber Prost', 'unknown' ],
    required: true,
  },
  countryOfOrigin: {
    type: String,
    required: true,
  },
  shortVita: {
    type: String,
  },
});

const Artist = model("Artist", artistSchema);

module.exports = Artist;
