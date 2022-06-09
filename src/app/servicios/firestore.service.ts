import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

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

  turnosCollection:any;
  turnos:any;

  constructor(private firestore:AngularFirestore) 
  {
    this.pacienteCollection=this.firestore.collection('pacientes');
    this.pacientes=this.pacienteCollection.valueChanges();


    this.especialistaCollection=this.firestore.collection('especialistas');
    this.especialistas=this.especialistaCollection.valueChanges({idField: 'id'});


    this.usuarioCollection=this.firestore.collection('usuarios'); 
    this.usuarios=this.usuarioCollection.valueChanges({idField: 'id'});

    this.turnosCollection=this.firestore.collection('turnos'); 
    this.turnos=this.turnosCollection.valueChanges({idField: 'id'});



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


  traerEspecialistas(){

  let pacientes=this.getPacientes();
  let especialistas:any[]=[];



  for(let item of pacientes){
    if(item.tipo == 'especialista'){
        especialistas.push(item);
      }
    }
  
    return especialistas;


    return this.pacientes;
  
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


  agregarTurno(object:any){

    this.firestore.collection('turnos').add(object);

  }






}
