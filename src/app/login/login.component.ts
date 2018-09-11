import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  public isLoginGoogle: any;


  constructor(
    public authService: AuthService,
    public router: Router,
    public flashMensaje: FlashMessagesService

  ) { }

  ngOnInit() {

  }

  onSubmitLogin(){
    this.authService.loginEmail(this.email, this.password)
      .then((res)=>{
        this.isLoginGoogle = false;
        localStorage.setItem("GoogleKey", this.isLoginGoogle);
        this.flashMensaje.show('Ha ingresado satisfactoriamente, Bienvenido!!', {cssClass: 'alert-succes', timeout: 4000});
        this.router.navigate(['/home']);
      }).catch((err)=>{
          this.flashMensaje.show(err.message, {cssClass: 'alert-danger', timeout: 4000});
        console.log(err);
        this.router.navigate(['/']);
      });
  }

  onClickGoogleLogin(){
    this.authService.loginGoogle()
      .then((res)=>{
        this.isLoginGoogle = true;
        localStorage.setItem("GoogleKey", this.isLoginGoogle);
        this.router.navigate(['/home']);
      }).catch(err => {
        this.isLoginGoogle = false;
        console.log(err.message)
      });
    //console.log('GOOGLE');
  }

  enviarForm(form){
    console.log(form)
  }
}
