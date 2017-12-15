import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { UploadService } from '../../services/upload.service';

import { GLOBAL } from '../../services/global';
import { Category } from '../../models/category';

@Component({
  selector: 'categoryEdit',
  templateUrl: '../category-edit/category-edit.component.html',
  styleUrls: ['../category-add/category-add.component.css'],
  providers: [UserService, CategoryService, UploadService]
})
export class CategoryEditComponent implements OnInit {
  public titulo: string;
  public category: Category;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public is_edit;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _uploadService: UploadService

  ) {
    this.titulo = 'Crear nueva categoría';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.category = new Category ('','','');
    this.is_edit = true;
   }

  ngOnInit() {
    console.log('categoryedit component cargado');

    this.getCategory();
  }

  getCategory(){
    this._route.params.forEach((params: Params) =>{
       let id = params['id'];

       this._categoryService.getCategory(this.token,id).subscribe(
           response => {
              if(!response.category){
                this._router.navigate(['/']);
              }else{
                this.category = response.category;
              }
           },
           error => {
             var errorMessage = <any>error;
             if (errorMessage != null) {
               var body = JSON.parse(error._body);
              //  this.alertMessage = body.message;
               console.log(error);
             }
           }
       );
    });
  }

  onSubmit(){
    console.log(this.category);
    this._route.params.forEach((params: Params) =>{
       let id = params['id'];
    this._categoryService.editCategory(this.token,id,this.category).subscribe(
      response => {
          this.category = response.category;

          if(!response.category){
            this.alertMessage('Error en el servidor')
          }else{
            this.alertMessage('La categoría se ha actualizado correctamente')

            //Subir la imagen de la categoría
            this._uploadService.makeFileRequest(this.url + 'upload-image-category/'+id,[], this.filesToUpload, this.token, 'image')
            .then(
              (result) =>{
                this._router.navigate(['/categories',1])
              },
              (error) => {
                 console.log(error);
              }
            );
            // this.category = response.category;
            // this._router.navigate(['/editar-categoria'], response.category._id);
          }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body);
          this.alertMessage = body.message;
          console.log(error);
        }
        }
    );
    });
  }
  public filesToUpload: Array<File>;

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  }
