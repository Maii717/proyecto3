import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryListComponent } from './components/category-list/category-list.component';



export const routes: Routes = [
  { path: '', component: CategoryListComponent },
  { path: 'mis-datos', component:UserEditComponent  },
  { path: '**', redirectTo: '' }
];
