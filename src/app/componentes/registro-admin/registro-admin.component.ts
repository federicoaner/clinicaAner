import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { LoginService } from 'src/app/servicios/login.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/servicios/storage.service';


@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.scss']
})
export class RegistroAdminComponent implements OnInit {


  tipo: any;
  tocado: boolean = false;

  public forma !: FormGroup;
  public formb !: FormGroup;
  alertError: string = "";
  responseMessage: boolean | string = false;
  imagenes: any[] = [];
  imagenPath:string|null="";



 
  constructor(private fb: FormBuilder, private firestore: FirestoreService, private auth: LoginService, private router: Router,private storage:StorageService) {



    this.formb = this.fb.group({
      // 'nombre' : ['',[Validators.required, this.spacesValidator]],
      'nombre': ['', Validators.required],
      'apellido': ['', Validators.required],
      'edad': ['', Validators.required],
      'dni': ['', Validators.required],
     
      'mail': ['', Validators.required],
      'password': ['', Validators.required],
      'tipo': ['administrador'],
      'fotoPerfil': ['']
      


    });

  }

  
  cargarImagenAdmin(event:any) {

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
        console.log(urlImagen);
       this.imagenPath=urlImagen;
      });


    }
  //  return url;

  }

  registroAdmin() {

    let user = {
      nombre: this.formb.get('nombre')?.value,
      apellido: this.formb.get('apellido')?.value,
      edad: this.formb.get('edad')?.value,
      dni: this.formb.get('dni')?.value,
      
      mail: this.formb.get('mail')?.value,
      password: this.formb.get('password')?.value,
      tipo: "administrador",
      fotoPerfil: this.imagenPath
    }

    // this.firestore.agregarUsuario(this.forma.value);
    //this.auth.Register(user);



    this.auth.Register(user)
      .then((response) => {

        this.firestore.agregarUsuario(user);

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
