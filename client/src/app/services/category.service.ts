import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Category} from '../models/category';

@Injectable()

export class CategoryService {

  public url: string;  //Aquí se guarda la url de la api rest.
  constructor(private _http: Http){
    this.url = GLOBAL.url; //Dentro de la propiedad url se guarda lo que esta en global
  }
  /** Traer todos las categorias por paginación */
  getCategories(token, page){

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers });
    return (this._http.get(this.url+'/get-all-categories/'+page, options).map( res => res.json()));

  }


  /** Traer una categoría por su id */
  getCategory(token, id: string){

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers }); //Opciones de la petición, se utiliza para el método get.
    return (this._http.get(this.url+'/get-category/'+id, options).map( res => res.json()));

  }

  /** Agregar una categoría a la base de datos */
  addCategory(token, category: Category){

    let params = JSON.stringify(category);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this._http.post(this.url+'/save-category', params, { headers: headers}).map( res => res.json());

  }

  /** Editar una categoría de la base de datos */
  editCategory(token, id: string, category: Category){

    let params = JSON.stringify(category);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this._http.put(this.url + '/put-category/' + id, params, { headers: headers}).map( res => res.json());

  }

  /** Eliminar una categoría de la base de datos */
  deleteCategory(token, id: string){

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers });
    return (this._http.delete( this.url + '/delete-category/' + id, options).map( res => res.json()));

  }
}
