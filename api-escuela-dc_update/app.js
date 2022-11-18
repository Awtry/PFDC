const express = require("express");
const app = express();

const { json, urlencoded } = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const fileupload = require('express-fileupload');

const mongoose = require("mongoose");

const alumnoRoute = require("./routes/alumno");
const maestroRoute = require("./routes/maestro");
const materiaRoute = require("./routes/materia");
const cloudinaryRoute = require("./routes/cloudinary");

dotenv.config();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(fileupload({useTempFiles: true}))

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Conexión a DB exitosa"))
  .catch((err) => {
    console.log(err);
  });

app.use("/api/alumno", alumnoRoute);
app.use("/api/maestro", maestroRoute);
app.use("/api/materia", materiaRoute);
app.use("/api/cloudinary", cloudinaryRoute);

module.exports = app;
