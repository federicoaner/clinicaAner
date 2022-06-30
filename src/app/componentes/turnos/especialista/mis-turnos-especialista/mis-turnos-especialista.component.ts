import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit,Input } from '@angular/core';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-mis-turnos-especialista',
  templateUrl: './mis-turnos-especialista.component.html',
  styleUrls: ['./mis-turnos-especialista.component.scss']
})
export class MisTurnosEspecialistaComponent implements OnInit {

  mostrarRechazar:boolean = false;
  mostrarFinalizar:boolean = false;
  mostrarResenia:boolean=false;
  @Input() rechazar : any;
  @Input() finalizar : any;
 

  peso:string="";
  altura:string="";
  resenia:string="";
  presion:string="";
  temperatura:string="";

  coleccion : any;
  usuarios : any;
  usuariosBD : any;

  usuarioParaMandar:any;


  
  constructor(private firebase:FirestoreService,private db : AngularFirestore) {

  

   }

  ngOnInit(): void {

   

  }







  rechazarTurno(event : any){
    this.rechazar = event;

    console.log(this.rechazar);
    this.mostrarRechazar = true;
  
  }

  finalizarTurno(event : any){
    this.finalizar = event;


    this.mostrarFinalizar = true;
  
  }



  confirmarRechazo(){
    let comentario = (<HTMLTextAreaElement> document.getElementById('comentario'))?.value;
    
    if(comentario != ''){
      this.rechazar.rechazado = true;
      this.rechazar.comentarioRechazado = comentario
      this.firebase.modificarTurno(this.rechazar, this.rechazar.id);
      (<HTMLTextAreaElement> document.getElementById('comentario')).value = '';
      console.log('Turno Rechazado', 'El turno fur Rechazado');
    }else{
      console.log('Alerta', 'Hay que comentar el motivo')
    }

    this.mostrarRechazar=false;
  }


  finalizarForm(){

    console.log(this.finalizar);
    this.finalizar.resenia=this.resenia;
    this.finalizar.realizado=true;

    let arrAux : any[] = [1,2,3];
    let clave : any;
    let valor : any;
    let claveValor : any;
    let algo :  any[] = [];

    let historiaClinica={

      fecha:this.finalizar.dia,
      hora:this.finalizar.hora,
      paciente: this.finalizar.paciente,
      especialista: this.finalizar.especialista,
      especialidad: this.finalizar.especialidad,
      dniPaciente:this.finalizar.dniPaciente,
      dniEspecialista:this.finalizar.dniEspecialista,
      peso:this.peso,
      presion:this.presion,
      altura:this.altura,
      temperatura:this.temperatura,
      resenia:this.finalizar.resenia,
      claveValor:  algo
     }

    for(let i = 0; i < arrAux.length; i++){
      clave = (<HTMLInputElement> document.getElementById(`clave${arrAux[i]}`)).value;
      valor = (<HTMLInputElement> document.getElementById(`valor${arrAux[i]}`)).value;

      claveValor = {
        clave : clave,
        valor : valor
      }

      let arr : any[] = [];
      arr.push(claveValor);

     

     historiaClinica.claveValor.push(claveValor);
 

      //this.finalizar.claveValor=arr;
    }

    /*
    for(let item of claveValor){
    console.log("claveValor="+item);
    }*/
   
    //console.log("finalizar clave valor +++"+ historiaClinica.claveValor);
    

   this.firebase.modificarTurno(this.finalizar,this.finalizar.id);

  

   this.firebase.agregarHistoriaClinica(historiaClinica);
   

   this.mostrarFinalizar=false;

  }



}
