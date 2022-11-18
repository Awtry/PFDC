const express=require('express');
const router = express.Router();
const alumnoController = require('../controllers/alumnoController')


router.put('/calif/:idAlumno/:idMat',alumnoController.updateGrades);
router.get('/materia/:idAlumno/:idMat',alumnoController.getAlumnoByMateriaId);
//router.get('/login/:email/:password',alumnoController.getAlumnoByPasswordAndEmail);
router.get('/',alumnoController.getAlumnos);
router.get('/:id',alumnoController.getAlumnoById);
router.post('/',alumnoController.post);
router.put('/:id',alumnoController.patch);
router.delete('/:id',alumnoController.delete);

module.exports= router