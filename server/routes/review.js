const express = require('express');
const reviewController = require('../controllers/review');
const multipart = require ('connect-multiparty');
const upload = multipart({uploadDir:'./uploads/reviews'});
const ensureLogin = require("connect-ensure-login");

const router = express.Router();


router.get('/review',reviewController.getReview);
router.post('/review',ensureLogin.ensureLoggedIn(),reviewController.saveReview);
router.post('/upload-image-review/:id',[ensureLogin.ensureLoggedIn(),upload],reviewController.uploadImage);
router.get('/get-image-review/:imageFile',reviewController.getImageFile);

module.exports = router;
