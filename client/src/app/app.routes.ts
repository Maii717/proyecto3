import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mis-datos', component:UserEditComponent  },
  { path: 'categorias/:page', component:CategoriesComponent  },
  { path: 'crear-categoria', component:CategoryAddComponent  },
  { path: 'editar-categoria/:id', component:CategoryEditComponent  },
  { path: '**', redirectTo: '' }
];
