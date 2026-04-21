const express = require("express");
const cors = require("cors");
const middleware = require("./utils/middleware");

const albumRoutes = require("./routes/albumRoutes");
const artistRoutes = require("./routes/artistRoutes");
const genreRoutes = require("./routes/genreRoutes");
const libraryRoutes = require("./routes/libraryRoutes");
const userRoutes = require("./routes/userRoutes");
const chartRoutes = require("./routes/chartRoutes");
const dataPortRoutes = require("./routes/dataPortRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/auth", authRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/library", libraryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/charts", chartRoutes);
app.use("/api/data-port", dataPortRoutes);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
