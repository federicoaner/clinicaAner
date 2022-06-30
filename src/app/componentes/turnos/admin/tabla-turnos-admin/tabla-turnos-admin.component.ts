import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { LoginService } from 'src/app/servicios/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-turnos-admin',
  templateUrl: './tabla-turnos-admin.component.html',
  styleUrls: ['./tabla-turnos-admin.component.scss']
})
export class TablaTurnosAdminComponent implements OnInit {


  coleccion : any;
  turnos : any;
  turnosBD : any;

  turnosValidos : any[] = [];
  turnosAMostrar : any[] = [];
  arrEspecialistasValidos : any[] = [];
  arrEspecialidadesValidas : any[] = [];

  mostrarReseniaBandera:boolean=false;
  reseniaAMostrar:string="";

  banderaFiltroEspecialista:boolean=false;
  @Output() cancelar = new EventEmitter();

  constructor(private firebase :FirestoreService , private db : AngularFirestore,private auth:LoginService) { 

    this.coleccion = this.db.collection<any>('turnos');
    this.turnos = this.coleccion.valueChanges({idField: 'id'});

  }

  ngOnInit(): void {

    this.turnos.subscribe((turnos : any) => {
      this.turnosBD = turnos;
      this.validarTurnos();
      this.validarEspecialistas();
      this.validarEspecialidades();
    });


  }

  validarTurnos(){

 
    this.turnosValidos = [];
    
    for(let item of this.turnosBD){
      

          this.turnosValidos.push(item);

      
    }

 
    this.turnosAMostrar = this.turnosValidos;

  }

  validarEspecialistas(){

    let index : any;
    let especialista : any;
    
    for(let item of this.turnosValidos){
      especialista = item.especialista
      index = this.arrEspecialistasValidos.indexOf(especialista);
      if(index == -1){
        this.arrEspecialistasValidos.push(especialista);
      }
    }

    console.log("---------" +this.arrEspecialistasValidos);
  }


  validarEspecialidades(){
    
    let index : any;
    let especialidad : any;
    
    for(let item of this.turnosValidos){
      especialidad = item.especialidad
      index = this.arrEspecialidadesValidas.indexOf(especialidad);
      if(index == -1){
        this.arrEspecialidadesValidas.push(especialidad);
      }
    }
  }



   filtroEspecialistas(especialista:any){
   
 
      
     this.turnosAMostrar = [];
    
    if(especialista != null){

      for(let item of this.turnosValidos){
        if(item.especialista == especialista){
          this.turnosAMostrar.push(item);
        }
      }
    }else{
      this.turnosAMostrar = this.turnosValidos;
    }



  }

  filtroEspecialidades(especialidad:any){
   

      
     this.turnosAMostrar = [];
    
    if(especialidad != null){

      for(let item of this.turnosValidos){
        if(item.especialidad == especialidad){
          this.turnosAMostrar.push(item);
        }
      }
    }else{
      this.turnosAMostrar = this.turnosValidos;
    }



  }

  btnReset(){

    this.turnosAMostrar = this.turnosValidos;
  }


  cancelarTurno(item:any){
   /* console.log("holis");
    let it:any;

    it=item;
    it.cancelado=true;

    this.firebase.modificarTurno(it,it.id);*/
    this.cancelar.emit(item);
  }

/*
  verResenia(item:any){

    this.reseniaAMostrar=item.resenia;
   this.mostrarReseniaBandera=true;

  }*/

  verResenia(item:any){
   

    Swal.fire({
      title: "Reseña:",
      text: item.resenia,      
  }).then((result) => {
      if (result.value) {
       
      }
  });

  }

  cerrarResenia(){
    this.mostrarReseniaBandera=false;
  }


  filtrar(){

   

    let filtro = (<HTMLInputElement> document.getElementById('filtro')).value.toString();
 

    let array : any[] = [];
    let index : any;

 
    
   
      filtro = filtro.toLowerCase();
      
      for(let item of this.turnosValidos){

        if(filtro.includes("cancelado")){
          if(item.cancelado){
            index = array.indexOf(item);
            if(index == -1){
              array.push(item)
            }
          }
        }
  
        if(filtro.includes("realizado")){
          if(item.realizado){
            index = array.indexOf(item);
            if(index == -1){
              array.push(item)
            }
          }
        }
  
        if(filtro.includes("rechazado")){
          if(item.rechazado){
            index = array.indexOf(item);
            if(index == -1){
              array.push(item)
            }
          }
        }
  
        if(filtro.includes("reseña")){
          if(item.realizado){
            index = array.indexOf(item);
            if(index == -1){
              array.push(item)
            }
          }
        }
  
        if(filtro.includes("especialidad")){
          if(item.especialidad){
            index = array.indexOf(item);
            if(index == -1){
              array.push(item)
            }
          }
        }
  
        if(filtro.includes("paciente")){
          if(item.paciente){
            index = array.indexOf(item);
            if(index == -1){
              array.push(item)
            }
          }
        }
  
        if(filtro.includes("hora")){
          if(item.hora){
            index = array.indexOf(item);
            if(index == -1){
              array.push(item)
            }
          }
        }

        if(item.dniPaciente.toString().includes(filtro)){
          index = array.indexOf(item);
          if(index == -1){
            array.push(item)
          }
        }

        if(item.especialidad.toLowerCase().includes(filtro)){
          index = array.indexOf(item);
          if(index == -1){
            array.push(item)
          }
        }

        if(item.especialista.toLowerCase().includes(filtro)){
          index = array.indexOf(item);
          if(index == -1){
            array.push(item)
          }
        }

        if(item.paciente.toLowerCase().includes(filtro)){
          index = array.indexOf(item);
          if(index == -1){
            array.push(item)
          }
        }

 



      }

        this.turnosAMostrar = array;
     }

  



}
