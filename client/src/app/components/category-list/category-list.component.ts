import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  providers: [UserService]
})
export class CategoryListComponent implements OnInit {

  public titulo:string;
  public category:string ;
  public identity;
  public token;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router:Router,
    private _userService: UserService,
  ){

    this.titulo = 'Categorías';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
  ngOnInit(){
   console.log('category-list.component.ts cargado');
  }
}
