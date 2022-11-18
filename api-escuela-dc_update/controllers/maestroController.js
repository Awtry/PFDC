const Maestro = require("../models/Maestro");

const maestroController = {};

maestroController.getMaestroByPasswordAndEmail = async (req, res) => {
  const { nombreUsuario, password } = req.params;

  try {
    let maestros = await Maestro.findOne(
      { nombreUsuario: nombreUsuario, password: password },
      { materias: 0 }
    );

    res.json(maestros);
  } catch (error) {
    res.status(500).json({ error });
  }
};


maestroController.getMaestros = async (req, res) => {
  try {
    let maestros = await Maestro.find({});
    res.json(maestros);
  } catch (error) {
    res.status(500).json({ error });
  }
};

maestroController.getMaestroById = async (req, res) => {
  const { id } = req.params;
  try {
    let maestro = await Maestro.findById(id);

    if (maestro) {
      res.json(maestro);
    } else {
      throw { status: 404, message: "No se encontro el maestro" };
    }
  } catch (error) {
    res
      .status(error.status ? error.status : 500)
      .json({ error: error.status ? error.message : error });
  }
};

maestroController.post = async (req, res) => {
  try {
    //   if (!name || !type) {
    //     throw { status: 400, message: "Faltan datos" };
    //   }

    var maestroExpect = {};

    const expectedParams = [
      "nombre",
      "foto",
      "apellidop",
      "apellidom",
      "correo",
      "matricula",
      "password",
    ];

    Object.keys(req.body).forEach((key) => {
      if (expectedParams.includes(key)) {
        maestroExpect[key] = req.body[key];
      }
    });

    let maestro = new Maestro(maestroExpect);

    await maestro.save();

    res.json(maestro);
  } catch (error) {
    res
      .status(error.status ? error.status : 500)
      .json({ error: error.status ? error.message : error });
  }
};

maestroController.patch = async (req, res) => {
  const { id } = req.params;

  try {
    var maestroExpect = {};

    const expectedParams = [
      "nombre",
      "foto",
      "apellidop",
      "apellidom",
      "correo",
      "matricula",
      "password",
    ];

    Object.keys(req.body).forEach((key) => {
      if (expectedParams.includes(key)) {
        maestroExpect[key] = req.body[key];
      }
    });

    await Maestro.updateOne({ _id: id }, maestroExpect);

    res.json("Se actualizo correctamente" );
  } catch (error) {
    res.status(500).json({ error });
  }
};

maestroController.delete = async (req, res) => {
  const { id } = req.params;

  try {
    let remove = await Maestro.deleteOne({ _id: id });
    res.json({ message: "Se elimino el maestro correctamente" });
  } catch (error) {
    res.status(404).json({ message: "No se encontro el maestro " });
  }
};

module.exports = maestroController;
