import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
 export class UserService{

     public url: string;  //Aquí se guarda la url de la api rest.
     public identity;
     public token;

     constructor (private _http: Http){
         this.url = GLOBAL.url; //Dentro de la propiedad url se guarda lo que esta en global
     }

     signUp(user_to_login, gethash = null){

         if(gethash != null){
             user_to_login.gethash = gethash;
         }

         let json = JSON.stringify(user_to_login);
         let params = json;

         let headers = new Headers({'Content-Type': 'application/json'});

         return this._http.post(this.url + '/login', params, {headers}).map( res => res.json());
     }

     getIdentity(){
         let identity = JSON.parse(localStorage.getItem('identity'));

         if(identity != 'undefined'){
             this.identity = identity;
         }
         else{
             this.identity = null;
         }
         return this.identity;
     }


     getToken(){
         let token = localStorage.getItem('token');
         if(token != 'undefined'){
             this.token = token;
         }
         else{
             this.token = null;
         }
         return this.token;
     }

     register(user_to_register){
         let json = JSON.stringify(user_to_register);
         let params = json;

         let headers = new Headers({'Content-Type': 'application/json'});

         return this._http.post(this.url + '/register', params, {headers}).map( res => res.json());
     }

     updateUser(user_to_update){
       console.log("ENTRO EN user_to_updateOUPDATE", user_to_update );
         let json = JSON.stringify(user_to_update);
         let params = json;
         console.log(json)

         let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });

         return this._http.post(this.url + 'update-user/' + user_to_update._id, params, {headers}).map( res => res.json());
     }
 }
