import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { LoginService } from 'src/app/servicios/login.service';
import { ToasterService } from 'src/app/servicios/toaster.service';

@Component({
  selector: 'app-alta-turnos',
  templateUrl: './alta-turnos.component.html',
  styleUrls: ['./alta-turnos.component.scss']
})
export class AltaTurnosComponent implements OnInit {

  listadoEspecialistas : Observable<any[]>;
  especialidadActual:any;
  mostrarDias:boolean=false;
  mostrarFechas:boolean=false;
  //diasSemana : any[] = [];
  dias : any[] = [];
  fechasValidas : any[] = [];
  diasValidos : any[] = [];
  especialistaSeleccionadox : any;
  fechaA:string="";

  fechaSeleccionada : any;
  horaSeleccionada : any;
  horasValidas : any[] = [];
  mostrarHoras : boolean=false;
 

  constructor(private fire:FirestoreService, private datePipe : DatePipe, private auth:LoginService, private toast:ToasterService) { 

    this.listadoEspecialistas=this.fire.getUsuarios();
    this.especialidadActual="";
   // this.diasSemana = ["Lunes","Martes", "Miercoles","Jueves","Viernes","Sabado"];
  }

 
  especialistaSeleccionado(item:any){
    console.log(item.nombre);
    this.especialidadActual=item.especialidad;
    this.especialistaSeleccionadox = item;
    console.log(this.especialistaSeleccionadox);
    this.seleccionFechaTurno();
   // this.cargarFechas();
   
  }
  
  seleccionFechaTurno(){
   

    this.cargarFechas();
  }

  cargarFechas(){
    this.dias = [];
    let fecha = new Date();
    for(let i = 0; i < 15; i++){
      fecha.setDate(fecha.getDate() + 1);
      if(fecha.getDay() != 0){
        this.dias.push(new Date(fecha));
      }
      else{
        i--;
      }
    }

    this.getFechasValidas();
  }

  getFechasValidas(){
    
    let aux : any[] = [];
    let retorno : any[] = [];
    let fecha = new Date();

   // console.log(this.especialistaSeleccionadox.dias)

    for(let item of this.especialistaSeleccionadox.dias){
      switch(item){
        case 'Lunes': 
          aux.push(1);
          break;
        case 'Martes':
          aux.push(2);
          break;
        case 'Miercoles': 
          aux.push(3);
          break;
        case 'Jueves':
          aux.push(4);
          break;
        case 'Viernes': 
          aux.push(5);
          break;
        case 'Sabado':
          aux.push(6);
          break;
      }
    }

    console.log("paso ´por fechasvalidas")

    for(let item of this.dias){
      fecha.setDate(item.getDate());
        if(aux.includes(fecha.getDay())){
          console.log(fecha.getDay())
          retorno.push(item);
        }
    }

    this.diasValidos = retorno;
  }



  mostrarDiasC(){

    this.mostrarDias=true;
   //this.mostrarDias = true;
    //this.seleccionFechaTurno();
  }

/*
  btnFecha(){
    console.log(this.fechasValidas);
  }*/

  btnDia(opcion : any){
    this.mostrarDias = false

    let aux : any;
    let fecha = new Date()
    let retorno : any[] = [];

    switch(opcion){
      case 'Lunes': 
        aux = 1;
        break;
      case 'Martes':
        aux = 2;
        break;
      case 'Miercoles': 
        aux = 3;
        break;
      case 'Jueves':
        aux = 4;
        break;
      case 'Viernes': 
        aux = 5;
        break;
      case 'Sabado':
        aux = 6;
        break;
    }
    
    
    for(let item of this.dias){
      fecha.setDate(item.getDate());
        if(aux == fecha.getDay()){
          item = this.datePipe.transform(item, 'dd/MM/yyyy');
          retorno.push(item);

       
        }
    }


    this.fechasValidas = retorno;
    this.mostrarFechas = true;

    console.log("aaa:  "+this.fechasValidas)

    
  }


  btnFecha(opcion : any){

    this.mostrarFechas = false;

    this.fechaSeleccionada = opcion;
    console.log(this.fechaSeleccionada);

    let index : any;

    this.horasValidas = this.especialistaSeleccionadox.horarios.map((item : any) => item);

    if(this.especialistaSeleccionadox.turnos != null){

        for(let item of this.especialistaSeleccionadox.turnos) 
        {
          console.log(item);
          if(item.dia == this.fechaSeleccionada){
            for(let horario of this.especialistaSeleccionadox.horarios){
              if(horario == item.hora){
                index = this.horasValidas.indexOf(horario);
                if(index != -1){
                  this.horasValidas.splice(index, 1);
                }
              }
            }
          }
        }

    }

    this.mostrarHoras = true;
    console.log("pasoPor seleccion Fecha");
  }


  btnHora(opcion : any){
    this.horaSeleccionada = opcion;
    this.mostrarHoras = false;

    this.mandarTurno();
  }


 
 mandarTurno(){

  let turno  = {
    dniPaciente : this.auth.logged.dni,
    paciente : this.auth.logged.nombre + ' ' + this.auth.logged.apellido,
    dniEspecialista : this.especialistaSeleccionadox.dni,
    especialista : this.especialistaSeleccionadox.nombre + ' ' + this.especialistaSeleccionadox.apellido,
    dia : this.fechaSeleccionada,
    hora : this.horaSeleccionada,
    aceptado: false,
    realizado: false,
    rechazado: false,
  }

  if(!turno.dniPaciente){

    this.toast.mostrarToastSuccess("error","No hay ningun paciente logueado!!");

  }

  this.fire.agregarTurno(turno);
  this.toast.mostrarToastSuccess("Exito","Turno Solicitado!!");

 




 }


 
 

 

  ngOnInit(): void {
  }

}
