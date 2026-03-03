const express = require("express");
const middleware = require("./utils/middleware");

const albumRoutes = require("./routes/albumRoutes");
const artistRoutes = require("./routes/artistRoutes");
const genreRoutes = require("./routes/genreRoutes");
const libraryRoutes = require("./routes/libraryRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/albums", albumRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/library", libraryRoutes);
app.use("/api/users", userRoutes);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
