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
 // mail: string;



  constructor(public usuario: LoginService, private router:Router){
   // this.mail = this.usuario.logged.mail;

  }

    
  Logout(){

    this.usuario.signOut();
    this.router.navigateByUrl('login');

  }



}
