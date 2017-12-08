const path = require ('path');
const fs = require ('fs');

const Place = require('../models/Place');
const Category = require('../models/Category');
const Review = require('../models/Review');
const multipart = require ('connect-multiparty');

function getReview(req, res){
  res.status(200).send({message:'Funciona'})
}


function saveReview(req,res){
  let review = new Review();
  let params = req.body;

  review.title = params.title;
  review.description = params.description;
  review.image = 'null';
  review.rating = params.rating;
  review.from = params.user;
  review.place = params.place;

  review.save((err, reviewStored) =>{
    if(err){
      res.status(500).send({message:'Error en el servidor'});
    } else{
      if(!reviewStored){
         res.status(404).send({message:'Error al añadir la review'});
      }else{
        res.status(200).send({review: reviewStored});
      }
    }
  });
}


function uploadImage(req, res){
  let reviewId = req.params.id;
  let fileName = 'No hay imagen...';

  if(req.files){
    let file_path = req.files.image.path;
    let file_split = file_path.split('/');
    let fileName = file_split[2];

    let ext_split = fileName.split('.');
    let file_ext = ext_split[1];


    if(file_ext == 'PNG'|| file_ext == 'JPG'|| file_ext == 'GIF'|| file_ext == 'png' || file_ext == 'jpg'|| file_ext == 'gif'){
      Place.findByIdAndUpdate(reviewId, {image:fileName}, (err, reviewUpdated) =>{
        if(!reviewUpdated){
          res.status(404).send({message:'No se ha podido actualizar el lugar'});
        } else{
          res.status(200).send({review:reviewUpdated});
        }
      });
    }else{
      res.status(200).send({message: 'Extensión del archivo no valida'});
    }

  }else{
    res.status(200).send({message: 'No has subido ninguna imagen...'});
  }
}



function getImageFile(req,res){
  let imageFile = req.param.imageFile;
  let pathFile = './uploads/reviews/'+imageFile;

  fs.exists(pathFile, function (exits){
    if(exits){
      res.sendFile(path.resolve(pathFile));
    }else{
      res.status(200).send({message: 'No existe la imagen...'});
    }

  });
}



module.exports= {
  getReview,
  saveReview,
  uploadImage,
  getImageFile
};
