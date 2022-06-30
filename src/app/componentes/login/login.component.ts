import { Component, OnInit } from '@angular/core';

//import { Usuario } from 'src/app/clases/usuario';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoginService } from 'src/app/servicios/login.service';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { Observable } from 'rxjs';

import { Firestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { ToasterService } from 'src/app/servicios/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  mail: string;
  password: string;
  responseMessage: boolean | string = false;

  usuariosBD: any;
  coleccion: any;
  especialistas: any;

  spinner = "../../../assets/spinnerImage.gif"


  constructor(private router: Router, private db: AngularFirestore, public auth: LoginService, private firestore: FirestoreService, private toast: ToasterService) {

    this.mail = "";
    this.password = "";



    this.coleccion = this.db.collection<any>('usuarios');
    this.especialistas = this.coleccion.valueChanges();
    this.auth.loading = false;


  };




  ngOnInit(): void {

    this.especialistas.subscribe((especialistas: any) => {
      this.usuariosBD = especialistas;
    });



  }


  AccesoRapido() {
    this.mail = 'pedro@admin.com';
    this.password = 'pedro1234';

  }

  AccesoEspecialista() {
    this.mail = 'especialista@especialista.com';
    this.password = 'especialista1234';

  }

  AccesoEspecialista2() {
    this.mail = 'maria@paz.com';
    this.password = 'mariapaz1234';

  }

  AccesoEspecialista3() {
    this.mail = 'adalberto@gmail.com';
    this.password = 'adalberto1234';

  }

  AccesoPaciente() {
    this.mail = 'paciente@paciente.com';
    this.password = 'paciente1234';

  }

  AccesoPaciente2() {
    this.mail = 'oscar@perez.com';
    this.password = 'oscar1234';

  }




  Loguearse() {
    try {


      this.auth.loading = true;
      let user = {
        mail: this.mail,
        password: this.password
      }
      let algo: boolean = true;

      this.auth.Login(user.mail, user.password).then((data: any) => {


        console.log(this.usuariosBD);
        let auxUsuario: any;
        for (let item of this.usuariosBD) {
          if (item.mail == user.mail && item.password == user.password) {
            auxUsuario = item;


          }
        }

        if (auxUsuario.tipo == 'especialista' && auxUsuario != 'paciente' && auxUsuario != 'aministrador' && auxUsuario.cuentaVerificada) {


          this.auth.userInfo = auxUsuario;
          this.router.navigate(['']);


        } else if (auxUsuario?.tipo == 'especialista' && !auxUsuario?.cuentaVerificada) {

          this.toast.mostrarToastInfo("especialista no Verificado", "error!");
          this.auth.signOut();
          this.router.navigate(['']);

        }

        if (auxUsuario?.tipo != 'especialista' && auxUsuario?.tipo == 'paciente' || auxUsuario?.tipo == 'administrador') {


          this.auth.userInfo = auxUsuario;
          this.router.navigate(['bienvenida']);
          this.auth.Login(user.mail, user.password);
          this.firestore.guardarLog(user.mail);

        }
      }).catch(err => {


        switch (err.code) {

          case 'auth/invalid-mail':
            this.responseMessage = 'mail invalido.';
            break;
          case 'auth/user-disabled':
            this.responseMessage = 'Usuario deshabilitado.';
            break;
          case 'auth/user-not-found':
            this.responseMessage = 'Usuario no encontrado.';
            break;
          case 'auth/wrong-password':
            this.responseMessage = 'Contrasenia incorrecta.';
            break;
          case 'auth/user-not-found':
            this.responseMessage = 'Usuario no encontrado.';
            break;
          default:
            this.responseMessage = 'Error';
        }
        console.log('Error en login.ts: ', err);
      });

    } catch (err) {
      console.log("Error ingresar", err);

    }
  }




  Loguearse2() {


    this.auth.loading = true;

    let user = {
      mail: this.mail,
      password: this.password
    }

    let auxUsuario: any;
    console.log("usuario: " + user.mail);
    console.log(this.usuariosBD);


    for (let item of this.usuariosBD) {
      if (item.mail == user.mail && item.password == user.password) {
        auxUsuario = item;

      }
    }


    try {


      this.auth.Login(user.mail, user.password).then((response) => {
        this.router.navigateByUrl("");
        console.log("se logueo;" + this.mail)




        this.firestore.guardarLog(user.mail);
        this.auth.userInfo = auxUsuario;
      })



        .catch(err => {
          //this.responseMessage = err.message;
          switch (err.code) {
            case 'auth/invalid-email':
              this.responseMessage = 'Email invalido.';
              break;
            case 'auth/user-disabled':
              this.responseMessage = 'Usuario deshabilitado.';
              break;
            case 'auth/user-not-found':
              this.responseMessage = 'Usuario no encontrado.';
              break;
            case 'auth/wrong-password':
              this.responseMessage = 'Contrasenia incorrecta.';
              break;
            case 'auth/user-not-found':
              this.responseMessage = 'Usuario no encontrado.';
              break;
            default:
              this.responseMessage = 'Error';
          }
          console.log('Error en login.ts: ', err);
        });

    } catch (err) {
      console.log("Error ingresar", err);
    }
  }















}//fin clase
