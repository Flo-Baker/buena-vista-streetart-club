const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  }, 
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String, 
    required: true, 
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String, 
    required: true
  },
  profilePicture: {
    type: String,
    default: "https://pixabay.com/vectors/avatar-beak-black-cute-emotion-1295404/"
  }
});

const User = model("User", userSchema);

module.exports = User;
