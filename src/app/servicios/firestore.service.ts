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

  historiaClinicaCollection:any;
  historiaClinica:any;

 logUsuariosCollection:any;
 logUsuarios:any;

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

    this.historiaClinicaCollection=this.firestore.collection('historiaClinica'); 
    this.historiaClinica=this.historiaClinicaCollection.valueChanges({idField: 'id'});

    this.logUsuariosCollection=this.firestore.collection('logUsuarios'); 
    this.logUsuarios=this.logUsuariosCollection.valueChanges({idField: 'id'});



  }


  guardarLog(mail:any){
    let day = new Date();
    let hora: any = day.getHours();
    let minutos: any = day.getMinutes();

    if(hora < 10)
    {
      hora = '0' + hora;
    }

    if(minutos < 10)
    {
      minutos = '0' + minutos;
    }

    let log = {
      usuario: mail,
      hora: hora + ':' + minutos,
      fecha: day.getDate() + '/' + ( day.getMonth() + 1 ) + '/' + day.getFullYear(),
    }
    this.firestore.collection('logUsuarios').add(log);
  }

  getPacientes(){

    return this.pacientes;
   }

   agregarPaciente(object:any){

    this.firestore.collection('pacientes').add(object);
   }

   getLogUsuarios(){

    return this.logUsuarios;
   }

   agregarLogUsuarios(object:any){

    this.firestore.collection('logUsuarios').add(object);
   }

   getHistoriaClinica(){

    return this.historiaClinica;
   }

   agregarHistoriaClinica(object:any){

    this.firestore.collection('historiaClinica').add(object);
   }


   modificarEspecialista(object : any, id : any){
   
    console.log("modificado");
    return this.firestore.collection('usuarios').doc(id).update(object);

   
  }

  modificarTurno(object : any, id : any){
   
    console.log("modificado");
    return this.firestore.collection('turnos').doc(id).update(object);

   
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

  getTurnos(){

    return this.turnos;
   }

  agregarTurno(object:any){

    this.firestore.collection('turnos').add(object);

  }






}
