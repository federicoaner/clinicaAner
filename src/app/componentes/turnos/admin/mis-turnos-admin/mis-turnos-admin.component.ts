import { Component, OnInit,Input } from '@angular/core';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-mis-turnos-admin',
  templateUrl: './mis-turnos-admin.component.html',
  styleUrls: ['./mis-turnos-admin.component.scss']
})
export class MisTurnosAdminComponent implements OnInit {

  @Input() cancelar : any;
  mostrarCancelar:boolean=false;

  constructor(private firebase : FirestoreService) { 


  }

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
          this.cancelar.comentarioCancelado = " Admin: " + result.value;
          this.firebase.modificarTurno(this.cancelar, this.cancelar.id);

      }
  });

  }




  confirmar(){
    let comentario = (<HTMLTextAreaElement> document.getElementById('comentario'))?.value;
    
    if(comentario != ''){
      this.cancelar.cancelado = true;
      this.cancelar.comentarioCancelado = " Admin: " + comentario
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
