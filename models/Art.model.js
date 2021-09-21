const { Schema, model } = require("mongoose");

const artSchema = new Schema ({
    category: {
        type: String,
        enum: [ 'Graffiti', 'Sticker', 'Urban Knitting', 'Graphic Poster', 'Paper Works', 'Mosaic', 'Stencil' ],
    }, 
    artist: {
        type: String, 
        // enum: [ 'Xoooox', 'Banksy', 'C215', '1UP', 'El Bocho', 'SOBR', 'Gregos', 'Invader', 'Alias', 'SP38', 'Mein Lieber Prost', 'unknown' ],
        required: true,
    },
    titleOfArtwork: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        },
    artworkImage: {
        type: String,
    },
    uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

const Art = model("Art", artSchema);

module.exports = Art;