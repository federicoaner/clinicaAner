import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-tabla-administradores',
  templateUrl: './tabla-administradores.component.html',
  styleUrls: ['./tabla-administradores.component.scss']
})
export class TablaAdministradoresComponent implements OnInit {
  @Output() productoOutput: EventEmitter<any>= new EventEmitter<any>();
  listadoAdmins : Observable<any[]>;
  btnAlta:boolean=false;

  constructor(private firestore :FirestoreService) { 

    this.listadoAdmins=this.firestore.getUsuarios();
  }

  enviarProducto(producto:any){
     
    console.log (producto);
    this.productoOutput.emit(producto);
 
   }

  


  ngOnInit(): void {
  }

}
