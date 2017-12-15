import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { Category } from '../../models/category';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  public titulo: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,

  ){
    this.titulo = 'Home';

  }

  ngOnInit(){
    console.log('home component cargado')
}
}
