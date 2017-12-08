const User = require('../models/User');
const fs = require('fs');
const path = require ('path');
const multipart = require ('connect-multiparty');

function updateUser (req,res) {
  const userId = req.params.id;
  const update = req.body;

  User.findByIdAndUpdate(userId, update, (err, userUpdated) =>{
    if(err){
      res.status(500).send({message:'Error al actualizar el usuario'});
    }else{
      if(!userUpdated){
        res.status(404).send({message:'No se ha podido actualizar el usuario'});
      }else{
        res.status(200).send({user:userUpdated});
      }
        }
  });
}



function uploadImage(req, res){
  let userId = req.params.id;
  let fileName = 'No hay imagen...';

  if(req.files){
    let file_path = req.files.image.path;
    let file_split = file_path.split('/');
    let fileName = file_split[2];

    let ext_split = fileName.split('.');
    let file_ext = ext_split[1];

        console.log(file_ext);
    if(file_ext == 'PNG'|| file_ext == 'JPG'|| file_ext == 'GIF'|| file_ext == 'png' || file_ext == 'jpg'|| file_ext == 'gif'){
      User.findByIdAndUpdate(userId, {image:fileName}, (err, userUpdated) =>{
        if(!userUpdated){
          res.status(404).send({message:'No se ha podido actualizar el usuario'});
        } else{
          res.status(200).send({user:userUpdated});
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
  let pathFile = './uploads/users/'+imageFile;

  fs.exists(pathFile, function (exits){
    if(exits){
      res.sendFile(path.resolve(pathFile));
    }else{
      res.status(200).send({message: 'No existe la imagen...'});
    }

  });
}

module.exports = {
  updateUser,
  uploadImage,
  getImageFile
};
