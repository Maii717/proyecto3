import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';

import { GLOBAL } from '../../services/global';
import { Category } from '../../models/category';

@Component({
  selector: 'categories-list',
  templateUrl: './categories.component.html',
  providers: [CategoryService, UserService],
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit{
  public titulo: string;
  public categories: Category[];
  public identity;
  public token;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService

  ){
    this.titulo = 'Categorías';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url
  }

  ngOnInit(){
    console.log('categories component cargado')
}
}
