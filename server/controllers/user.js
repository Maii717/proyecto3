

const User = require('../models/User');
const fs = require('fs');
const path = require ('path');
const multipart = require ('connect-multiparty');
const bcrypt = require ('bcrypt-nodejs');
const jwt = require('../services/jwt');

//Crear usuario
function saveUser(req,res){
  var  user = new User();

  var params = req.body;

  user.name = params.name;
  user.surname = params.surname;
  user.email = params.email;
  user.password = params.password;
  user.role = 'ROLE_USER';
  user.image = 'null';

  if (params.password){
    //encriptar password and save data
    bcrypt.hash(params.password, null, null, function(err, hash){
      user.password = hash;
      if (user.name != null && user.surname != null  && user.email != null && user.email != null){
        //Save user
         user.save((err,userStored) => {
           if(err){
             res.status(500).send({message:'Error al guardar el usuario'});
           }else{
             if(!userStored){
               res.status(404).send({message:'No se ha registrado el usuario'});
             }else{
               res.status(200).send({user:userStored});

             }

           }
         });

      }else{
        res.status(200).send({message:'Rellena todos los campos'});
      }
    });
  }else{
    res.status(500).send({message:'Introduce la contraseña'});
  }
}



//Metodo LogIn
function loginUser(req, res){
	var params = req.body;
	var email = params.email;
	var password = params.password;
	// buscamos el email //
	User.findOne({email: email.toLowerCase()}, (err,user) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!user){
				res.status(404).send({message: ' El usuario no existe'});
			}else{
				// Comprobar la contraseña
				bcrypt.compare(password, user.password, function(err, check){
					if(check){
						// devolver los datos del usuar io logueado //
						if(params.gethash){
							// devolver un token de jwt //
							res.status(200).send({token: jwt.createToken(user)  // llamamos al servicio jwt //
							});
						}else{
							// hash vacio
							res.status(200).send({user});
						}
					}else{
						res.status(404).send({message: ' El usuario no ha podido loguearse'});
					}
				});
			}
		}
	});
}



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



function uploadImage(req, rs){
  const userId = req.params.id;
  const fileName = 'No hay imagen...';

  if(req.files){
    const file_path = req.files.image.path;
    const file_split = file_path.split('/');
    const fileName = file_split[2];

    const ext_split = fileName.split('.');
    const file_ext = ext_split[1];

        console.log(file_ext);
    if(file_ext == 'PNG'|| file_ext == 'JPG'|| file_ext == 'GIF'|| file_ext == 'png' || file_ext == 'jpg'|| file_ext == 'gif'){
      User.findByIdAndUpdate(userId, {image:fileName}, (err, userUpdated) =>{
        if(!userUpdated){
          res.status(404).send({message:'No se ha podido actualizar el usuario'});
        } else{
          res.status(200).send({image: fileName, user:userUpdated});
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
  saveUser,
  loginUser,
  updateUser,
  uploadImage,
  getImageFile,
};
