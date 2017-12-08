const express = require('express');
const placeController = require('../controllers/place');
const multipart = require ('connect-multiparty');
const upload = multipart({uploadDir:'./uploads/places'});
const ensureLogin = require("connect-ensure-login");

const router = express.Router();


router.get('/places/:category?',placeController.getPlaces);
router.get('/place/:id',placeController.getPlace);
router.post('/place',ensureLogin.ensureLoggedIn(),placeController.savePlace);
router.put('/place/:id',ensureLogin.ensureLoggedIn(),placeController.updatePlace);
router.delete('/place/:id',ensureLogin.ensureLoggedIn(),placeController.deletePlace);
router.post('/upload-image-place/:id',[ensureLogin.ensureLoggedIn(),upload],placeController.uploadImage);
router.get('/get-image-place/:imageFile',placeController.getImageFile);

module.exports = router;
