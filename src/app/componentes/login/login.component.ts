import { Component, OnInit } from '@angular/core';

//import { Usuario } from 'src/app/clases/usuario';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoginService } from 'src/app/servicios/login.service';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { Observable } from 'rxjs';

import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  mail: string;
  password: string;
  responseMessage : boolean | string =false;
  spinner:boolean=false;
  usuariosBD :any;
  coleccion :any;
  especialistas : any;
 

  constructor (private router:Router,private db:AngularFirestore, public auth:LoginService, private firestore:FirestoreService ){

    this.mail="";
    this.password="";

  
  
   this.coleccion = this.db.collection<any>('usuarios');
   this.especialistas = this.coleccion.valueChanges();
  };




  ngOnInit(): void {

    this.especialistas.subscribe((especialistas : any) => {
      this.usuariosBD = especialistas;
    });
  }

    
 AccesoRapido(){
  this.mail = 'admin@admin.com';
  this.password = 'admin1234';
  
}




Loguearse(){
  try{

    let user = {
      mail: this.mail,
      password: this.password
    }
    let algo:boolean= true;

    this.auth.Login(user.mail,user.password).then((data:any)=>{
    

      console.log(this.usuariosBD);
      let auxUsuario : any;
    for(let item of this.usuariosBD){
    if(item.mail == user.mail && item.password == user.password ){
      auxUsuario = item;

     // alert(auxUsuario);
          }   
        }
        
        if(auxUsuario?.tipo == 'especialista' && auxUsuario !='paciente' && auxUsuario?.cuentaVerificada){
         
            this.auth.logged = auxUsuario;
            this.router.navigate(['']);
            this.auth.loading=false;
          }else if(auxUsuario?.tipo == 'especialista' && !auxUsuario.cuentaVerificada ){
            alert('especialista no verificado');
            this.auth.signOut();
            this.auth.loading=false;
          }  

          if ( auxUsuario?.tipo != 'especialista' && auxUsuario?.tipo == 'paciente' || auxUsuario.tipo == 'administrador'){
            this.auth.logged = auxUsuario;
            this.router.navigate(['']);
            alert("entro");
            this.auth.loading=false;
          } 
        }) .catch(err =>{

      //this.responseMessage = err.message;
      switch(err.code)
      {
        
        case 'auth/invalid-email':
         this.responseMessage= 'Email invalido.';
          break;     
        case 'auth/user-disabled':
          this.responseMessage= 'Usuario deshabilitado.';
          break;
        case 'auth/user-not-found':
          this.responseMessage= 'Usuario no encontrado.';
          break;       
        case 'auth/wrong-password':
          this.responseMessage= 'Contrasenia incorrecta.';
          break;  
        case 'auth/user-not-found':
          this.responseMessage='Usuario no encontrado.';
          break;
        default:
          this.responseMessage = 'Error';
      }
      console.log('Error en login.ts: ',err);
    }); 

  }catch(err){
    console.log("Error ingresar",err);
    
  }
}






 
 

 








}//fin clase
