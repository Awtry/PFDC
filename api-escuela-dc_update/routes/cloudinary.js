const express=require('express');
const router = express.Router();
const cloudinaryController = require('../controllers/cloudinaryController')

router.post('/upload', cloudinaryController.upload);

module.exports= router