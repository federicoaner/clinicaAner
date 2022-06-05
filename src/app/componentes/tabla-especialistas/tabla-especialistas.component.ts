
import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { FirestoreService } from 'src/app/servicios/firestore.service';


@Component({
  selector: 'app-tabla-especialistas',
  templateUrl: './tabla-especialistas.component.html',
  styleUrls: ['./tabla-especialistas.component.scss']
})
export class TablaEspecialistasComponent implements OnInit {

  

  
  @Output() productoOutput: EventEmitter<any>= new EventEmitter<any>();
  listadoEspecialistas : Observable<any[]>;

  constructor(private firestore :FirestoreService) { 

    this.listadoEspecialistas=this.firestore.getUsuarios();
  }


  enviarProducto(producto:any){
     
    console.log (producto);
    this.productoOutput.emit(producto);
 
   }


  

   verificarEspecialista(especialista : any){
    especialista.cuentaVerificada = !especialista.cuentaVerificada;
    //console.log(especialista.id);
    this.firestore.modificarEspecialista(especialista,especialista.id);
  }



 

  ngOnInit(): void {
  }

}
