import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { UploadService } from '../../services/upload.service';

import { GLOBAL } from '../../services/global';
import { Category } from '../../models/category';

@Component({
  selector: 'categoryAdd',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css'],
  providers: [UserService, CategoryService, UploadService]
})
export class CategoryAddComponent implements OnInit {
  public titulo: string;
  public category: Category;
  public identity;
  public token;
  public url: string;
  public alertMessage

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
   }

  ngOnInit() {
    console.log('categoriesAdd component cargado');
  }
  onSubmit(){
    console.log(this.category);
    this._categoryService.addCategory(this.token, this.category).subscribe(
      response => {
          this.category = response.category;

          if(!response.category){
            this.alertMessage('Error en el servidor')
          }else{
            this.alertMessage('La categoría se ha creado correctamente')
            this.category = response.category;
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
  }
  public filesToUpload: Array<File>;

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  }
