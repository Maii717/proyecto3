const express = require('express');
const categoryController = require('../controllers/category');
const multipart = require ('connect-multiparty');
const upload = multipart({uploadDir:'./uploads/categories'});
const ensureLogin = require("../middleware/authenticated");

const router = express.Router();


router.get('/category/:id',categoryController.getCategory);
router.post('/category',ensureLogin.ensureAuth,categoryController.saveCategory);
router.post('/category/:id',ensureLogin.ensureAuth,categoryController.updateCategory);
router.delete('/category/:id',ensureLogin.ensureAuth,categoryController.deleteCategory);
router.post('/upload-image-category/:id',[ensureLogin.ensureAuth,upload],categoryController.uploadImage);
router.get('/get-image-category/:imageFile',categoryController.getImageFile);

module.exports = router;
