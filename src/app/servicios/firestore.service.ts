import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  pacienteCollection:any;
  pacientes:any;

  especialistaCollection:any;
  especialistas:any;

  usuarioCollection:any;
  usuarios:any;

  constructor(private firestore:AngularFirestore) 
  {
    this.pacienteCollection=this.firestore.collection('pacientes');
    this.pacientes=this.pacienteCollection.valueChanges();


    this.especialistaCollection=this.firestore.collection('especialistas');
    this.especialistas=this.especialistaCollection.valueChanges({idField: 'id'});


    this.usuarioCollection=this.firestore.collection('usuarios'); 
    this.usuarios=this.usuarioCollection.valueChanges({idField: 'id'});



  }

  getPacientes(){

    return this.pacientes;
   }

   agregarPaciente(object:any){

    this.firestore.collection('pacientes').add(object);
   }

   modificarEspecialista(object : any, id : any){
   
    console.log("modificado");
    return this.firestore.collection('usuarios').doc(id).update(object);

   
  }


   
  getEspecialistas(){

    return this.especialistas;
   }

   agregarEspecialista(object:any){

    this.firestore.collection('especialistas').add(object);
   }

/*
   modificarEspecialista(object : any, id : any){
    return this.firestore.collection('usuarios').doc(id).update(object);
  }*/
/*

  modificarEspecialista(object : any, id : any){
   
    console.log("modificado");
    return this.firestore.collection('especialistas').doc(id).update(object);

   
  }*/


    
  getUsuarios(){

    return this.usuarios;
   }

   agregarUsuario(object:any){

    this.firestore.collection('usuarios').add(object);
   }   

   modificarUsuarios(object : any, id : any){
   
    console.log("modificado");
    return this.firestore.collection('usuarios').doc(id).update(object);

   
  }






}
