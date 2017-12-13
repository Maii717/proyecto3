const express = require('express');
const reviewController = require('../controllers/review');
const multipart = require ('connect-multiparty');
const upload = multipart({uploadDir:'./uploads/reviews'});
const ensureLogin = require("../middleware/authenticated");

const router = express.Router();


router.get('/review/:id',reviewController.getReview);
router.get('/reviews/:place?',reviewController.getReviews);
router.post('/review',ensureLogin.ensureAuth,reviewController.saveReview);
router.post('/upload-image-review/:id',[ensureLogin.ensureAuth,upload],reviewController.uploadImage);
router.get('/get-image-review/:imageFile',reviewController.getImageFile);
router.delete('/review/:id',ensureLogin.ensureAuth,reviewController.deleteReview);

module.exports = router;
