import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
import { SeccionComponent } from './pages/seccion/seccion.component';
import { ComparadorComponent } from './pages/comparador/comparador.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TagsComponent } from './pages/admin/tags/tags.component';
import { ElementosComponent } from './pages/admin/elementos/elementos.component';
import { AddComponent } from './pages/admin/tags/add/add.component';
import { ModifyComponent } from './pages/admin/tags/modify/modify.component';
import { SelectComponent } from './pages/admin/tags/select/select.component';
import { SelectActionComponent } from './pages/admin/tags/selectaction/selectaction.component';
import { EditComponent } from './pages/admin/elementos/edit/edit.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'

const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent},
  { path: 'seccion', component:  SeccionComponent},
  { path: 'comparador/:tags', component:  ComparadorComponent},
  { path: 'login', component:  LoginComponent},
  { path: 'register', component:  RegisterComponent},
  {path:  'admin/tags', component: TagsComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path:  'admin/tags/add',component:AddComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path:  'admin/tags/modify/:tag/:properties',component:ModifyComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path:  'admin/tags/select',component:SelectComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path:  'admin/tags/select/:tagID',component:SelectActionComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path:  'admin/elementos',component:ElementosComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path:  'admin/elementos/edit/:id',component:EditComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
