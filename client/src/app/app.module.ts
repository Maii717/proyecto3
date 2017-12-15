import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';
import { HomeComponent } from './components/home/home.component';
// import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import {routes} from './app.routes';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    CategoriesComponent,
    HomeComponent,
    CategoryAddComponent,
    CategoryEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
