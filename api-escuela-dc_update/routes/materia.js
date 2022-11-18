const express=require('express');
const router = express.Router();
const materiaController = require('../controllers/materiaController')

router.get('/alumnos-materia/:idMat',materiaController.getAlumnosByMateriaId);
router.get('/',materiaController.getMaterias);
router.get('/alumno/:id',materiaController.getMateriaByStudentId);
router.get('/maestro/:id',materiaController.getMateriaByTeacherId);
router.get('/desc-alumno/:idMat/:idUser',materiaController.getMateriaByIdAndStudenId);
router.get('/desc-materia/:idMat',materiaController.getMateriaByIdTeacher);
router.get('/:id',materiaController.getMateriaById);
router.post('/',materiaController.post);
router.put('/:id',materiaController.patch);
router.delete('/:id',materiaController.delete);

module.exports= router