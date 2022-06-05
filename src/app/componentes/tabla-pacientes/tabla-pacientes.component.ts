import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-tabla-pacientes',
  templateUrl: './tabla-pacientes.component.html',
  styleUrls: ['./tabla-pacientes.component.scss']
})
export class TablaPacientesComponent implements OnInit {

  @Output() productoOutput: EventEmitter<any>= new EventEmitter<any>();
  listadoPacientes : Observable<any[]>;

  constructor(private firestore :FirestoreService) { 

    this.listadoPacientes=this.firestore.getUsuarios();
  }


  enviarProducto(producto:any){
     
    console.log (producto);
    this.productoOutput.emit(producto);
 
   }

 

  ngOnInit(): void {
  }

}
