const Materia = require("../models/Materia");
const { Types } = require("mongoose");
const Alumno = require("../models/Alumno");

const materiaController = {};

materiaController.getMateriaByTeacherId = async (req, res) => {
  const { id } = req.params;
  try {
    let materias = await Materia.aggregate()
      .match({ "maestroId": Types.ObjectId(id) })
      .project({
        nombre: 1,
        foto: 1,
        descripcion: 1,
        dia: { $arrayElemAt: ["$dia", 0] },
        hora: { $arrayElemAt: ["$hora", 0] },
        maestroId: 1
      });

    res.json(materias);
  } catch (error) {
    res.status(500).json({ error });
  }
}

materiaController.getMateriaByStudentId = async (req, res) => {
  const { id } = req.params;
  try {
    let materias = await Materia.aggregate()
      .lookup({
        from: "alumnos",
        localField: "_id",
        foreignField: "materias.materiaId",
        as: "alumno",
      })
      .unwind("$alumno")
      .match({ "alumno._id": Types.ObjectId(id) })
      .project({
        nombre: 1,
        foto: 1,
        descripcion: 1,
        dia: { $arrayElemAt: ["$dia", 0] },
        hora: { $arrayElemAt: ["$hora", 0] },
        maestroId: 1,
        alumnoId: "$alumno._id",
      });

    res.json(materias);
  } catch (error) {
    res.status(500).json({ error });
  }
};

materiaController.getMateriaByIdAndStudenId = async (req, res) => {
  const { idMat, idUser } = req.params;
  try {
    let alumno = await Alumno.aggregate()
      .lookup({
        from: "materias",
        localField: "materias.materiaId",
        foreignField: "_id",
        as: "materiasDesc",
      })
      .unwind("$materias")
      .unwind("$materiasDesc")
      .match({
        _id: Types.ObjectId(idUser),
        "materias.materiaId": Types.ObjectId(idMat),
        "materiasDesc._id": Types.ObjectId(idMat),
      })
      .project({
        _id: "$materiasDesc._id",
        idAlumno: "$_id",
        idMaestro: "$materiasDesc.maestroId",
        nombre: "$materiasDesc.nombre",
        foto: "$materiasDesc.foto",
        descripcion: "$materiasDesc.descripcion",
        hora: { $arrayElemAt: ["$materiasDesc.hora", 0] },
        dia: { $arrayElemAt: ["$materiasDesc.dia", 0] },
        cal1: { $arrayElemAt: ["$materias.calificaciones.calificacion", 0] },
        cal2: { $arrayElemAt: ["$materias.calificaciones.calificacion", 1] },
        cal3: { $arrayElemAt: ["$materias.calificaciones.calificacion", 2] },
      });

    if (alumno.length <= 0) throw "No se encontro";
    res.json(alumno[0]);
  } catch (error) {
    res.status(500).json({ error });
  }
};

materiaController.getMateriaByIdTeacher = async (req, res) => {
  const { idMat } = req.params;
  try {
    let materia = await Materia.aggregate()
      .lookup({
        from: "alumnos",
        localField: "_id",
        foreignField: "materias.materiaId",
        as: "alumno",
      })
      .match({ "_id": Types.ObjectId(idMat) })
      .project({
        nombre: 1,
        foto: 1,
        descripcion: 1,
        dia: 1,
        hora: 1,
        idMaestro: "$maestroId",
        numeroAlumnos: { $size: "$alumno"},
      });

      if (materia.length <= 0) throw "No se encontro";

      res.json(materia[0]);
  } catch (error) {
    res.status(500).json({ error });
  }
};

materiaController.getAlumnosByMateriaId = async (req, res) => {
  const { idMat } = req.params;
  try {
    let materia = await Materia.aggregate()
      .lookup({
        from: "alumnos",
        localField: "_id",
        foreignField: "materias.materiaId",
        as: "alumno",
      })
      .match({ "_id": Types.ObjectId(idMat) })
      .project({nombre: 1, alumnos: "$alumno"});

      if (materia.length <= 0) throw "No se encontro";

      res.json(materia[0]);
  } catch (error) {
    res.status(500).json({ error });
  }
};

materiaController.getMaterias = async (req, res) => {
  try {
    let materias = await Materia.find({});
    res.json(materias);
  } catch (error) {
    res.status(500).json({ error });
  }
};

materiaController.getMateriaById = async (req, res) => {
  const { id } = req.params;
  try {
    let materia = await Materia.findById(id);

    if (materia) {
      res.json(materia);
    } else {
      throw { status: 404, message: "No se encontro el materia" };
    }
  } catch (error) {
    res
      .status(error.status ? error.status : 500)
      .json({ error: error.status ? error.message : error });
  }
};

materiaController.post = async (req, res) => {
  try {
    //   if (!name || !type) {
    //     throw { status: 400, message: "Faltan datos" };
    //   }

    var materiaExpect = {};

    const expectedParams = [
      "nombre",
      "foto",
      "descripcion",
      "dia",
      "hora",
      "maestroId",
    ];

    Object.keys(req.body).forEach((key) => {
      if (expectedParams.includes(key)) {
        materiaExpect[key] = req.body[key];
      }
    });

    let materia = new Materia(materiaExpect);

    await materia.save();

    res.json(materia);
  } catch (error) {
    res
      .status(error.status ? error.status : 500)
      .json({ error: error.status ? error.message : error });
  }
};

materiaController.patch = async (req, res) => {
  const { id } = req.params;

  try {
    var materiaExpect = {};

    const expectedParams = [
      "nombre",
      "foto",
      "descripcion",
      "dia",
      "hora",
      "maestroId",
    ];

    Object.keys(req.body).forEach((key) => {
      if (expectedParams.includes(key)) {
        materiaExpect[key] = req.body[key];
      }
    });

    await Materia.updateOne({ _id: id }, materiaExpect);

    res.json({ message: "Se actualizo correctamente" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

materiaController.delete = async (req, res) => {
  const { id } = req.params;

  try {
    let remove = await Materia.deleteOne({ _id: id });
    res.json({ message: "Se elimino el materia correctamente" });
  } catch (error) {
    res.status(404).json({ message: "No se encontro el materia " });
  }
};

module.exports = materiaController;
