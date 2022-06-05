import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { LoginService } from 'src/app/servicios/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  tipo: any;
  tocado: boolean = false;

  public forma !: FormGroup;
  public formb !: FormGroup;
  alertError: string = "";
  responseMessage: boolean | string = false;






  constructor(private fb: FormBuilder, private firestore: FirestoreService, private auth: LoginService, private router: Router) {

    this.forma = this.fb.group({
      // 'nombre' : ['',[Validators.required, this.spacesValidator]],
      'nombre': ['', Validators.required],
      'apellido': ['', Validators.required],
      'edad': ['', Validators.required],
      'dni': ['', Validators.required],
      'obraSocial': ['', Validators.required],
      'mail': ['', Validators.required],
      'password': ['', Validators.required],
      'tipo': ['paciente']


    });


    this.formb = this.fb.group({
      // 'nombre' : ['',[Validators.required, this.spacesValidator]],
      'nombre': ['', Validators.required],
      'apellido': ['', Validators.required],
      'edad': ['', Validators.required],
      'dni': ['', Validators.required],
      'especialidad': ['', Validators.required],
      'mail': ['', Validators.required],
      'password': ['', Validators.required],
      'cuentaVerificada': [false],
      'tipo': ['especialista']

    });


  }


  registro() {

    let user = {
      mail: this.forma.get('mail')?.value,
      password: this.forma.get('password')?.value,
    }

    // this.firestore.agregarUsuario(this.forma.value);
    //this.auth.Register(user);



    this.auth.Register(user)
      .then((response) => {

        this.firestore.agregarUsuario(this.forma.value);

        this.router.navigateByUrl('');

      }).catch((error: any) => {

        if (error.code == "auth/email-already-in-use") {
          this.alertError = "Ya existe un Usuario con esa cuenta.";
          this.responseMessage = "Ya exisiste un Usuario con esa cuenta";

        }
      });


  }


  registroEspecialista() {

    let userb = {
      mail: this.formb.get('mail')?.value,
      password: this.formb.get('password')?.value,
    }

    // this.firestore.agregarUsuario(this.forma.value);
    //this.auth.Register(user);



    this.auth.Register(userb)
      .then((response) => {

        this.firestore.agregarUsuario(this.formb.value);

        this.router.navigateByUrl('');

      }).catch((error: any) => {

        if (error.code == "auth/email-already-in-use") {
          this.alertError = "Ya existe un Usuario con esa cuenta.";
          this.responseMessage = "Ya exisiste un Usuario con esa cuenta";

        }
      });


  }









  ngOnInit(): void {
  }

}
