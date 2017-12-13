

const path = require ('path');
const fs = require ('fs');

const Place = require('../models/Place');
const Category = require('../models/Category');
const Review = require('../models/Review');
const multipart = require ('connect-multiparty');



function getPlace(req,res){

  let placeId = req.params.id;

  Place.findById(placeId).populate({path: 'category'}).exec((err, place)=>{
    if(err){
      res.status(500).send({message:'Error en la petición.'});
    }else{
      if(!place){
      res.status(404).send({message:'El lugar no existe.'});
    }else{
      res.status(200).send({place});
  }
}
});

}






function getPlaces(req,res,next){

  const categoryId = req.params.category;

  if(!categoryId){

      var find = Place.find({}).sort('name');

  }else{

     var find = Place.find({place:placeId}).sort('name');
  }
    find.populate({path:'category'}).exec((err,places) =>{
      if(err){
        res.status(500).send({message:'Error en la petición'});
      }else{
        if(!places){
         res.status(404).send({message:'No hay lugares'});
       }else{
         res.status(200).send({places});
       }
      }
    });
}



function savePlace(req,res){
  let place = new Place();
  let params = req.body;

  place.name = params.name;
  place.description = params.description;
  place.image = 'null';
  place.location = params.location;
  place.address = params.address;
  place.city = params.city;
  place.category = params.category;
  place.zipCode =params.zipCode;

  place.save((err, placeStored) =>{
    if(err){
      res.status(500).send({message:'Error al añadir el lugar'});
    } else{
      if(!placeStored){
         res.status(404).send({message:'Error al añadir el lugar'});
      }else{
        res.status(200).send({place: placeStored});
      }
    }
  })
}

function updatePlace (req,res){
  const placeId = req.params.id;
  const update = req.body;

  Place.findByIdAndUpdate(placeId,update,(err,placeUpdated) =>{
    if(err){
      res.status(500).send({message: 'Error al guardar el lugar'});
    }else{
      if(!placeUpdated){
        res.status(404).send({message:'Error al actualizar el lugar'});
      }else{
        res.status(200).send({place: placeUpdated});
      }
    }
  });
}

 function deletePlace(req,res){
   const placeId = req.params.id;

    Place.findByIdAndRemove(placeId, (err, placeRemoved)=>{
      if(err){
        res.status(500).send({message: 'Error al eliminar el lugar'});
      }else{
        if(!placeRemoved){
         res.status(404).send({message: 'El lugar no ha sido eliminado'});
       }else{
         Review.find({place: placeRemoved._id}).remove((err, reviewRemoved)=>{
           if(err){
             res.status(500).send({message: 'Error al eliminar la review'});
           }else{
             if(!reviewRemoved){
               res.status(404).send({message: 'La review no ha sido eliminada'});
             }else{
               res.status(200).send({place: placeRemoved});
             }
           }
         });
       }
      }
    });
  }


  function uploadImage(req, res){
    let placeId = req.params.id;
    let fileName = 'No hay imagen...';

    if(req.files){
      let file_path = req.files.image.path;
      let file_split = file_path.split('/');
      let fileName = file_split[2];

      let ext_split = fileName.split('.');
      let file_ext = ext_split[1];

          console.log(file_ext);
      if(file_ext == 'PNG'|| file_ext == 'JPG'|| file_ext == 'GIF'|| file_ext == 'png' || file_ext == 'jpg'|| file_ext == 'gif'){
        Place.findByIdAndUpdate(placeId, {image:fileName}, (err, placeUpdated) =>{
          if(!placeUpdated){
            res.status(404).send({message:'No se ha podido actualizar el lugar'});
          } else{
            res.status(200).send({place:placeUpdated});
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
    let pathFile = './uploads/places/'+imageFile;

    fs.exists(pathFile, function (exits){
      if(exits){
        res.sendFile(path.resolve(pathFile));
      }else{
        res.status(200).send({message: 'No existe la imagen...'});
      }

    });
  }



module.exports ={
  getPlaces,
  getPlace,
  savePlace,
  updatePlace,
  deletePlace,
  uploadImage,
  getImageFile
}
