import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './/app-routing.module';
import { FlashMessagesModule} from 'angular2-flash-messages';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFirestoreModule} from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CarritoComprasComponent } from './carrito-compras/carrito-compras.component';
import { DescripProductoComponent } from './descrip-producto/descrip-producto.component';
import { BarraNavegacionComponent } from './barra-navegacion/barra-navegacion.component';
import { RegistroComponent } from './registro/registro.component';
import { ProductosComponent} from './productos/productos.component';

import { environment} from '../environments/environment';

import { ProductosService } from './productos.service';
import { AuthService} from './auth.service';
import { FlashMessagesService} from 'angular2-flash-messages';

import { AuthGuard} from './auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    CarritoComprasComponent,
    DescripProductoComponent,
    BarraNavegacionComponent,
    RegistroComponent,
    ProductosComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireAuthModule,
    FlashMessagesModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'TiendaEnLinea')
  ],
  providers: [
    AuthService,
    AuthGuard,
    ProductosService,
    FlashMessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
