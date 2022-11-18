const { Schema, model } = require("mongoose");

const AlumnoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },
  apellidop: {
    type: String,
    required: true,
  },
  apellidom: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: false,
    unique: true,
  },
  matricula: {
    type: String,
    required: true,
  },
 password: {
    type: String,
    required: true,
  },
  carrera: {
    type: String,
    required: true,
  },
  semestre: {
    type: Number,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
  comentario: {
    type: String,
    required: false,
  },
  materias: [
    {
      materiaId: Schema.Types.ObjectId,
      calificaciones: [
        {
          calificacion: Number,
          parcial: Number,
        },
      ],
      final:Number
    },
  ],
});

module.exports = model("Alumno", AlumnoSchema);
