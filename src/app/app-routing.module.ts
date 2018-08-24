import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {LoginComponent} from './login/login.component';
import {ProductosComponent} from './productos/productos.component';
import {CarritoComprasComponent} from './carrito-compras/carrito-compras.component';
import {RegistroComponent} from './registro/registro.component';

import {AuthGuard} from './auth.guard';

const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'home', component: HomePageComponent, canActivate:[AuthGuard]},
    {path: 'producto', component: ProductosComponent, canActivate:[AuthGuard]},
    {path: 'carrito-compras', component: CarritoComprasComponent, canActivate:[AuthGuard]},
    {path: 'registro', component: RegistroComponent}
  ]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports:[
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
