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
import { CategoryListComponent } from './components/category-list/category-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    CategoryListComponent,
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
