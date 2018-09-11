import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';
import { ProductosService } from '../productos.service';


//import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent implements OnInit {
  public isLogin: boolean;
  public isLoginGoogle: any;
  public nombreUsuario: string;
  public emailUsuario: string;
  public fotoUsuario: string;
  cant:number;
  total:number; // = this.productosService.getbadgeCart();
  public isTotal: any;
  //nombres = [];

  constructor(
    public authService: AuthService,
    public productosService: ProductosService
    //private loginComponent: LoginComponent
  ) { }

  ngOnInit() {
    //this.total = this.productosService.getbadgeCart();
    //this.isTotal = false;
    this.productosService.cast.subscribe(cant => {
      this.total = cant;
      //this.nombres.push({
      //  total: this.total
      //});
      this.isTotal = this.total>0;
      console.log(this.isTotal);
      console.log(this.total);
      //console.log(this.nombres);
    });

    this.isLoginGoogle = false;
    this.isLoginGoogle = localStorage.getItem("GoogleKey")=="true" ? true : false;
    this.authService.getAuth().subscribe(auth=>{

      if(auth){

        console.log(this.isLoginGoogle)
        if(this.isLoginGoogle == true){
          this.isLoginGoogle = true;

        }else {this.isLoginGoogle == false};
        console.log(this.isLoginGoogle);
        this.isLogin = true;
        this.nombreUsuario = auth.displayName;
        this.emailUsuario = auth.email;
        this.fotoUsuario = auth.photoURL;
      }else{
        this.isLoginGoogle = false;
        this.isLogin = false;
      }
    })
  }

  setBadge(){
    //this.total = this.productosService.getbadgeCart();
    //this.total = total;
    //console.log(total);
  }

  onClicklogOut(){
    this.isLoginGoogle = false;
    localStorage.setItem("GoogleKey", this.isLoginGoogle);
    this.authService.logout();
  }

}
