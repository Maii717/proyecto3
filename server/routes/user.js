const express = require('express');
const userController = require('../controllers/user');
const multipart = require ('connect-multiparty');
const upload = multipart({uploadDir:'./uploads/users'});
const ensureLogin = require("connect-ensure-login");

const router = express.Router();

router.put('/update-user/:id',ensureLogin.ensureLoggedIn(),userController.updateUser);
router.post('/upload-image-user/:id',[ensureLogin.ensureLoggedIn(),upload],userController.uploadImage);
router.get('/get-image-user/:imageFile',userController.getImageFile);

module.exports = router;
