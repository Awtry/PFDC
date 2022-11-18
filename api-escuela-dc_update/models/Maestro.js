const mongoose = require("mongoose");

const MaestroSchema = new mongoose.Schema({
  nombreUsuario:{
    type: String,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true
  },
  foto: {
    type: String,
    required: true
  },
  apellidop: {
    type: String,
    required: true
  },
  apellidom: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: false,
    unique: true
  },
  matricula: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Maestro", MaestroSchema);