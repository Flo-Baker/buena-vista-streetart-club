// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const projectName = "buena-vista-streetart-club";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

// 1. Route -> authentication
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// 2. Route -> profile
const profileRoutes = require("./routes/profile.routes");
app.use("/profile", profileRoutes);

// 3. Route -> artworks
const artworkRoutes = require("./routes/artwork.routes");
app.use("/artworks", artworkRoutes);

// 4. Route -> artworks
const artistRoutes = require("./routes/artist.routes");
app.use("/artists", artistRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
