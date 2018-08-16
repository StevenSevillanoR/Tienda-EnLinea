import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CarritoComprasComponent } from './carrito-compras/carrito-compras.component';
import { DescripProductoComponent } from './descrip-producto/descrip-producto.component';
import { BarraNavegacionComponent } from './barra-navegacion/barra-navegacion.component';
import { RegistroComponent } from './registro/registro.component';

import { AppRoutingModule } from './/app-routing.module';

import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';

import  {environment} from '../environments/environment';
import {AuthService} from './auth.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    CarritoComprasComponent,
    DescripProductoComponent,
    BarraNavegacionComponent,
    RegistroComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
