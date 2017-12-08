const express = require('express');
const categoryController = require('../controllers/category');
const multipart = require ('connect-multiparty');
const upload = multipart({uploadDir:'./uploads/categories'});
const ensureLogin = require("connect-ensure-login");

const router = express.Router();


router.get('/category/:id',categoryController.getCategory);
router.post('/category',ensureLogin.ensureLoggedIn(),categoryController.saveCategory);
router.post('/category/:id',ensureLogin.ensureLoggedIn(),categoryController.updateCategory);
router.delete('/category/:id',ensureLogin.ensureLoggedIn(),categoryController.deleteCategory);
router.post('/upload-image-category/:id',[ensureLogin.ensureLoggedIn(),upload],categoryController.uploadImage);
router.get('/get-image-category/:imageFile',categoryController.getImageFile);

module.exports = router;
