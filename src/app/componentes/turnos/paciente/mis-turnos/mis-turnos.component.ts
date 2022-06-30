import { Component, OnInit,Input } from '@angular/core';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent implements OnInit {

  @Input() cancelar : any;
  @Input() encuesta : any;
  mostrarCancelar:boolean=false;
  constructor(private firebase : FirestoreService) { 


  }


/*
  cancelarTurno(event : any){
    this.cancelar = event;

    console.log(this.cancelar);
    this.mostrarCancelar = true;
  //  this.mostrarResena = false;
   // this.mostrarEncuesta = false;
    //this.mostrarAtencion = false;
  }*/

  cancelarTurno(event : any){
    this.cancelar = event;

    console.log(this.cancelar);
    //this.mostrarCancelar = true;

    Swal.fire({
      title: "Cancelar Turno!",
      text: "Porque lo cancelas?",
      input: 'textarea',
      
      
      showCancelButton: true
      
  }).then((result) => {
      if (result.value) {
          console.log("Result: " + result.value);


          this.cancelar.cancelado = true;
          this.cancelar.comentarioCancelado = " Paciente: " + result.value;
          this.firebase.modificarTurno(this.cancelar, this.cancelar.id);

      }
  });

  }

  completarEncuesta(event : any){
    this.encuesta = event;

    console.log(this.cancelar);
    //this.mostrarCancelar = true;

    Swal.fire({
      title: "Encuesta!",
      text: "Que te parecio la atencion",
      input: 'textarea',
      
      
      showCancelButton: true
      
  }).then((result) => {
      if (result.value) {
          console.log("Result: " + result.value);

        
          this.encuesta.encuesta = true;
          this.encuesta.comentarioEncuesta = " Paciente: " + result.value;
          this.firebase.modificarTurno(this.encuesta, this.encuesta.id);
          

      }
  });

  }

  confirmar(){
    let comentario = (<HTMLTextAreaElement> document.getElementById('comentario'))?.value;
    
    if(comentario != ''){
      this.cancelar.cancelado = true;
      this.cancelar.comentarioCancelado = " Paciente: " + comentario
      this.firebase.modificarTurno(this.cancelar, this.cancelar.id);
      (<HTMLTextAreaElement> document.getElementById('comentario')).value = '';
      console.log('Turno cancelado', 'El turno ha sido cancelado');
    }else{
      console.log('Debe dejar un motivo', 'Deje un comentario para poder cancelar')
    }

    this.mostrarCancelar=false;
  }

  ngOnInit(): void {
  }

}
