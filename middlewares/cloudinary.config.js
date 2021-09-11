const cloudinary = require("cloudinary").v2;
const { Cloudinary, CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

//config our cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  folder: "bvsac-artwork-folder",
  allowedFormats: ["jpg", "jpeg", "png", "heic"],
});

module.exports = multer({ storage });