const cloudinary = require("cloudinary").v2;
var rimraf = require("rimraf");
const path = require("path");


const dotenv = require("dotenv");
dotenv.config();

const controller = {};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const cloudinaryUpload = (file) => {
  return new Promise((resolve, reject) => {
    try {
      cloudinary.uploader.upload(file.tempFilePath, (err, response) => {
        if (err) throw "error";
        resolve(response.secure_url);
      });
    } catch (error) {
      reject(error);
    }
  });
};

controller.upload = async (req, res) => {
  const { upload } = req.files;
  let tmpRpute = path.join(__dirname, "../tmp");
  try {
    let response = await cloudinaryUpload(upload);
    console.log(response)
    rimraf.sync(tmpRpute);
    res.json(response);
  } catch (error) {
    console.log(error)
    rimraf.sync(tmpRpute);
    res.status(500).json({ error });
  }
};

module.exports = controller;
