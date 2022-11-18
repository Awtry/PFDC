const { Schema, model } = require("mongoose");

const MateriaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  dia: {
    type: String,
  },
  hora: {
    type: String,
  },
  maestroId: Schema.Types.ObjectId,
});

module.exports = model("Materia", MateriaSchema);
