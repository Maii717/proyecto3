const express = require('express');
const placeController = require('../controllers/place');
const multipart = require ('connect-multiparty');
const upload = multipart({uploadDir:'./uploads/places'});
const ensureLogin = require("../middleware/authenticated");

const router = express.Router();


router.get('/places/:category?',placeController.getPlaces);
router.get('/place/:id',placeController.getPlace);
router.post('/place',ensureLogin.ensureAuth,placeController.savePlace);
router.put('/place/:id',ensureLogin.ensureAuth,placeController.updatePlace);
router.delete('/place/:id',ensureLogin.ensureAuth,placeController.deletePlace);
router.post('/upload-image-place/:id',[ensureLogin.ensureAuth,upload],placeController.uploadImage);
router.get('/get-image-place/:imageFile',placeController.getImageFile);

module.exports = router;
