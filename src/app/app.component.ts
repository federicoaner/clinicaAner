import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './servicios/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clinicaAner';
  email: string;



  constructor(public usuario: LoginService, private router:Router){
    this.email = this.usuario.logged.email;

  }

    
  Logout(){

    this.usuario.signOut();
    this.usuario.logged="";
    this.usuario.userInfo="";
    this.router.navigateByUrl('login');

  }



}
