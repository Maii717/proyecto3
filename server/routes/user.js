const express = require('express');
const userController = require('../controllers/user');
const multipart = require ('connect-multiparty');
const upload = multipart({uploadDir:'./uploads/users'});
const ensureLogin = require("../middleware/authenticated");

const router = express.Router();

router.get('/probando-controlador',ensureLogin.ensureAuth,userController.pruebas);
router.post('/register',userController.saveUser);
router.post('/login',userController.loginUser);
router.put('/update-user/:id',userController.updateUser);
router.post('/upload-image-user/:id',[ensureLogin.ensureAuth,upload],userController.uploadImage);
router.get('/get-image-user/:imageFile',ensureLogin.ensureAuth,userController.getImageFile);

module.exports = router;
