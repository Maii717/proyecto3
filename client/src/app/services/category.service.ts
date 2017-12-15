import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
//Mapeo de objetos
import 'rxjs/add/operator/map';
//Recoger respuestas de peticiones ajax
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import {Category} from '../models/category';

@Injectable()
export class  CategoryService
{
	public url: string;

	//Inyectar http
	constructor(private _http:Http)
	{
		this.url =  GLOBAL.url;
	}

  getCategories(token,page){
		let headers = new Headers ({
				'Content-Type':'application/json',
				'Authorization':token
		});
		let options = new RequestOptions({headers:headers});
		return this._http.get(this.url+'categories/'+page , options)
		                 .map(res => res.json());
	}

	getCategory(token, id: string){
		let headers = new Headers ({
				'Content-Type':'application/json',
				'Authorization':token
		});
		let options = new RequestOptions({headers:headers});
		return this._http.get(this.url+'category/'+id , options)
		                 .map(res => res.json());
	}

	addCategory(token,category: Category){

		let params = JSON.stringify(category);
		let headers = new Headers ({
        'Content-Type':'application/json',
				'Authorization':token
		});
		return this._http.post(this.url+'category',params, {headers:headers})
		                       .map(res => res.json());
	}

	editCategory(token,id:string, category: Category){

		let params = JSON.stringify(category);
		let headers = new Headers ({
        'Content-Type':'application/json',
				'Authorization':token
		});
		return this._http.post(this.url+'category/+id',params, {headers:headers})
		                       .map(res => res.json());
	}

	deleteCategory(token, id: string){
		let headers = new Headers ({
				'Content-Type':'application/json',
				'Authorization':token
		});
		let options = new RequestOptions({headers:headers});
		return this._http.delete(this.url+'category/'+id , options)
										 .map(res => res.json());
	}


}
