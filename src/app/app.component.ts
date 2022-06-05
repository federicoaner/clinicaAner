import { Component } from '@angular/core';
import { LoginService } from './servicios/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clinicaAner';
  mail: string;



  constructor(public usuario: LoginService){
    this.mail = this.usuario.logged.mail;

  }


}
