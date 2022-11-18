const Alumno = require("../models/Alumno");
const {
  Types
} = require("mongoose");

const alumnoController = {};

alumnoController.getAlumnoByMateriaId = async (req, res) => {
  const {
    idAlumno,
    idMat
  } = req.params

  console.log(idAlumno)
  try {
    let alumno = await Alumno
      .aggregate()
      .unwind("$materias")
      .match({
        _id: Types.ObjectId(idAlumno),
        "materias.materiaId": Types.ObjectId(idMat),
      })
      .project({
        nombre: 1,
        foto: 1,
        apellidop: 1,
        apellidom: 1,
        correo: 1,
        matricula: 1,
        carrera:1,
        semestre:1,
        group:1,
        comentario:1,
        materiaId: '$materias.materiaId',
        cal1: {
          $arrayElemAt: ["$materias.calificaciones.calificacion", 0]
        },
        cal2: {
          $arrayElemAt: ["$materias.calificaciones.calificacion", 1]
        },
        cal3: {
          $arrayElemAt: ["$materias.calificaciones.calificacion", 2]
        },
      });

    if (alumno.length <= 0) throw "No se encontro";
    res.json(alumno[0])
  } catch (error) {
    res.status(500).json({
      error
    });
  }
}

alumnoController.getAlumnoByPasswordAndEmail = async (req, res) => {
  const {
    email,
    password
  } = req.params;

  try {
    let alumnos = await Alumno.findOne({
      correo: email,
      password: password
    }, {
      materias: 0
    });

    res.json(alumnos);
  } catch (error) {
    res.status(500).json({
      error
    });
  }
};

alumnoController.getAlumnos = async (req, res) => {
  try {
    let alumnos = await Alumno.find({});
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({
      error
    });
  }
};

alumnoController.getAlumnoById = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    let alumno = await Alumno.findById(id);

    if (alumno) {
      res.json(alumno);
    } else {
      throw {
        status: 404,
        message: "No se encontro el alumno"
      };
    }
  } catch (error) {
    res
      .status(error.status ? error.status : 500)
      .json({
        error: error.status ? error.message : error
      });
  }
};

alumnoController.post = async (req, res) => {
  try {
    //   if (!name || !type) {
    //     throw { status: 400, message: "Faltan datos" };
    //   }

    var alumnoExpect = {};

    const expectedParams = [
      "nombre",
      "foto",
      "apellidop",
      "apellidom",
      "correo",
      "matricula",
      "password",
      "carrera",
      "semestre",
      "group",
      "comentario",
      "materias",
      
    ];

    Object.keys(req.body).forEach((key) => {
      if (expectedParams.includes(key)) {
        alumnoExpect[key] = req.body[key];
      }
    });

    let alumno = new Alumno(alumnoExpect);

    await alumno.save();

    res.json(alumno);
  } catch (error) {
    res
      .status(error.status ? error.status : 500)
      .json({
        error: error.status ? error.message : error
      });
  }
};

alumnoController.updateGrades = async (req, res) => {
  const {
    idAlumno,
    idMat
  } = req.params

  const {
    cal1,
    cal2,
    
  } = req.body

  try {
    let calificaciones = [{
      calificacion: cal1,
      parcial: 1
    }, {
      calificacion: cal2,
      parcial: 2
    }]

    let promedio = (calificaciones[0].calificacion+calificaciones[1].calificacion)/2


    let alumnos = await Alumno.findOneAndUpdate({
      _id: idAlumno,
      "materias.materiaId": Types.ObjectId(idMat)
    }, {
      "$set": {
        "materias.$.calificaciones": calificaciones,
        "materias.$.final": promedio
      }
    });
    res.json("Se actualizaron las calificaciones correctamente");
  } catch (error) {
    res.status(500).json({
      error
    });
  }
}

alumnoController.patch = async (req, res) => {
  const {
    id
  } = req.params;

  try {
    var alumnoExpect = {};

    const expectedParams = [
      "nombre",
      "foto",
      "apellidop",
      "apellidom",
      "correo",
      "matricula",
      "password",
      "carrera",
      "semestre",
      "group",
      "comentario",
      "materias",
    ];

    Object.keys(req.body).forEach((key) => {
      if (expectedParams.includes(key)) {
        alumnoExpect[key] = req.body[key];
      }
    });

    await Alumno.updateOne({
      _id: id
    }, alumnoExpect);

    res.json("Se actualizo correctamente");
  } catch (error) {
    res.status(500).json({
      error
    });
  }
};

alumnoController.delete = async (req, res) => {
  const {
    id
  } = req.params;

  try {
    let remove = await Alumno.deleteOne({
      _id: id
    });
    res.json({
      message: "Se elimino el alumno correctamente"
    });
  } catch (error) {
    res.status(404).json({
      message: "No se encontro el alumno "
    });
  }
};

module.exports = alumnoController;