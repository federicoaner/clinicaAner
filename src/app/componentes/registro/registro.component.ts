import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { LoginService } from 'src/app/servicios/login.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/servicios/storage.service';
import { ToasterService } from 'src/app/servicios/toaster.service';

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
  imagenes: any[] = [];
  imagenPath:string|null="";
  captcha:string;






  constructor(private fb: FormBuilder, private firestore: FirestoreService, private auth: LoginService, private router: Router,private storage:StorageService,private toast:ToasterService) {


    this.captcha="";

    this.forma = this.fb.group({
      // 'nombre' : ['',[Validators.required, this.spacesValidator]],
      'nombre': ['', Validators.required],
      'apellido': ['', Validators.required],
      'edad': ['', Validators.required],
      'dni': ['', Validators.required],
      'obraSocial': ['', Validators.required],
      'mail': ['', Validators.required],
      'password': ['', Validators.required],
      'tipo': ['paciente'],
      'fotoPerfil': [''],
      


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
      'tipo': ['especialista'],
      'fotoPerfil': [''],
      
      
      

    });


  }



  resolved(captchaResponse:string){

    this.captcha=captchaResponse;
    console.log("resuelto con rta: " + this.captcha )

  }
 

    cargarImagen(event:any) {

      let mail : any = this.forma.get('mail')?.value;
      let nombre : any = this.forma.get('nombre')?.value;
      //let nombre ="carlos";
      let archivos=event.target.files;
      let reader=new FileReader();
      let url:string|null;

      reader.readAsDataURL(archivos[0]);

      reader.onloadend= ()=>{

        console.log(reader.result);
        this.imagenes.push(reader.result);

        this.storage.subirImagen(nombre + "_" + mail + "_"  + Date.now(), reader.result).then(urlImagen=>{
          console.log(urlImagen);
         this.imagenPath=urlImagen;
        });


      }
    //  return url;

    }


    cargarImagenEspecialista(event:any) {

      let mail : any = this.formb.get('mail')?.value;
      let nombre : any = this.formb.get('nombre')?.value;
      //let nombre ="carlos";
      let archivos=event.target.files;
      let reader=new FileReader();
      let url:string|null;

      reader.readAsDataURL(archivos[0]);

      reader.onloadend= ()=>{

        console.log(reader.result);
        this.imagenes.push(reader.result);

        this.storage.subirImagen(nombre + "_" + mail + "_"  + Date.now(), reader.result).then(urlImagen=>{
          
         this.imagenPath=urlImagen;

         console.log(this.imagenPath);
      
      

        });


      }
  

    }






  registro() {

    let user = {
      nombre: this.forma.get('nombre')?.value,
      apellido: this.forma.get('apellido')?.value,
      edad: this.forma.get('edad')?.value,
      dni: this.forma.get('dni')?.value,
      obraSocial: this.forma.get('obraSocial')?.value,
      mail: this.forma.get('mail')?.value,
      password: this.forma.get('password')?.value,
      tipo: "paciente",
      fotoPerfil: this.imagenPath
      
    }

        
   

    // this.firestore.agregarUsuario(this.forma.value);
    //this.auth.Register(user);



    this.auth.Register(user)
      .then((response) => {
/*
        this.forma.setValue({
          foto: this.imagenPath });*/
          
        this.firestore.agregarUsuario(user);

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
      nombre: this.formb.get('nombre')?.value,
      apellido: this.formb.get('apellido')?.value,
      edad: this.formb.get('edad')?.value,
      dni: this.formb.get('dni')?.value,
      especialidad: this.formb.get('especialidad')?.value,
      mail: this.formb.get('mail')?.value,
      password: this.formb.get('password')?.value,
      cuentaVerificada: "false",
      tipo: "especialista",
      fotoPerfil: this.imagenPath
    }

    // this.firestore.agregarUsuario(this.forma.value);
    //this.auth.Register(user);



    this.auth.Register(userb)
      .then((response) => {

        this.firestore.agregarUsuario(userb);

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
