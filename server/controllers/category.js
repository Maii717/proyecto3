const path = require('path');
const fs = require('fs');

const Category = require('../models/Category');
const Place = require('../models/Place');
const Review = require('../models/Review');
const multipart = require ('connect-multiparty');
const mongoosePaginate = require('mongoose-pagination');



function getCategory(req, res){
 const categoryId = req.params.id;

 Category.findById(categoryId, (err, category)=> {
 if(err){
 res.status(500).send({message:'error en la petición'});
 } else {
 if(!category){
 res.status(404).send({message:'La categoría no existe'});
 } else {
 res.status(200).send({category});
 }
 }
 });
}


function saveCategory(req, res) {
  const category = new Category();
  const params = req.body;

  category.name = params.name;
  category.description = params.description;
  category.image = 'null';


  category.save((err, categoryStored) => {
    if (err) {
      res.status(500).send({message: 'Error al añadir la categoría'});
    } else {
      if (!categoryStored) {
        res.status(404).send({message: 'Error al añadir la categoría  '});
      } else {
        res.status(200).send({category: categoryStored});
     }
    }
  });
}

//Método que trae las categorías por paginación
function getAllCategories (req, res){

    var page;

    if (req.params.page) {

        page = req.params.page;
    }
    else {
        page = 1;
    }

    var itemsPerPage = 4;

    //.sort() es para ordenar en orden alfabetico por name
    Category.find().sort('name').paginate(page, itemsPerPage, (err, categories, total) => {
        if (err) {
            res.status(500).send({message: 'Error en la petición'});
        }
        else {
            if (!categories) {
                res.status(404).send({message: 'No hay categorías.'});
            }
            else {
                return (res.status(200).send({
                    total_items: total,
                    categories: categories
                }));
            }
        }
    });
}

function updateCategory(req, res) {
  const categoryId = req.params.id;
  const update = req.body;

  Category.findByIdAndUpdate(categoryId, update, (err, categoryUpdated) => {
    if (err) {
      res.status(500).send({
        message: 'Error al guardar la categoría'
      });
    } else {
      if (!categoryUpdated) {
        res.status(404).send({
          message: 'Error al actualizar la categoría'
        });
      } else {
        res.status(200).send({
          category: categoryUpdated
        });
      }
    }
  });
}

function deleteCategory(req, res) {
  const categoryId = req.params.id;

  Category.findByIdAndRemove(categoryId, (err, categoryRemoved) => {
    if (err) {
      res.status(500).send({
        message: 'Error'
      });
    } else {
      if (!categoryRemoved) {res.status(404).send({message:'Error al eliminar la categoría'});
      } else {
        res.status(404).send({categoryRemoved});
         Place.find({category : categoryRemoved._id}).find((err,placeRemoved)=>{
           if (err) {
             res.status(500).send({ message: 'Error'});
           } else {
             if (!placeRemoved) {
               res.status(404).send({message: 'Error al eliminar el lugar'});
             } else {
               Review.find({place : placeRemoved._id}).find((err,reviewRemoved)=>{
                 if (err) {
                   res.status(500).send({message: 'Error'});
                 } else {
                   if (!reviewRemoved) {
                     res.status(404).send({message: 'Error al eliminar la review'});
                   } else {
                     res.status(200).send({category: categoryRemoved});
                   }
                 }
            });
             }
           }
      });
    }
    }
  });
}


function uploadImage(req, res){
  let categoryId = req.params.id;
  let fileName = 'No hay imagen...';

  if(req.files){
    let file_path = req.files.image.path;
    let file_split = file_path.split('/');
    let fileName = file_split[2];

    let ext_split = fileName.split('.');
    let file_ext = ext_split[1];

        console.log(file_ext);
    if(file_ext == 'PNG'|| file_ext == 'JPG'|| file_ext == 'GIF'|| file_ext == 'png' || file_ext == 'jpg'|| file_ext == 'gif'){
      Category.findByIdAndUpdate(categoryId, {image:fileName}, (err, categoryUpdated) =>{
        if(!categoryUpdated){
          res.status(404).send({message:'No se ha podido actualizar la categoría'});
        } else{
          res.status(200).send({category:categoryUpdated});
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
  let pathFile = './uploads/categories/'+imageFile;

  fs.exists(pathFile, function (exits){
    if(exits){
      res.sendFile(path.resolve(pathFile));
    }else{
      res.status(200).send({message: 'No existe la imagen...'});
    }

  });
}


module.exports = {
  getAllCategories,
  getCategory,
  saveCategory,
  updateCategory,
  deleteCategory,
  uploadImage,
  getImageFile
}
