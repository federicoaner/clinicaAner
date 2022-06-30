import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { map, Observable } from 'rxjs';

import { FirestoreService } from 'src/app/servicios/firestore.service';
import { Workbook } from 'exceljs';
import * as file from 'file-saver';
import { AngularFirestore } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-tabla-pacientes',
  templateUrl: './tabla-pacientes.component.html',
  styleUrls: ['./tabla-pacientes.component.scss']
})
export class TablaPacientesComponent implements OnInit {

  @Output() productoOutput: EventEmitter<any>= new EventEmitter<any>();
  listadoPacientes : Observable<any[]>;
  historiaClinica : Observable<any[]>;

  coleccion : any;
  turnos : any;
  turnosBd : any;


  constructor(private firestore :FirestoreService, private db:AngularFirestore) { 

    this.listadoPacientes=this.firestore.getUsuarios();
    this.historiaClinica=this.firestore.getHistoriaClinica();


    this.coleccion = this.db.collection<any>('turnos');
    this.turnos = this.coleccion.valueChanges({idField: 'id'});
  }

  ngOnInit(): void {

    this.turnos.subscribe((turnos : any) => {
      this.turnosBd = turnos;
      
    });

    

  }


 

  enviarProducto(producto:any){
     
    console.log (producto);
    this.productoOutput.emit(producto);
 
   }

 
   generarExcel(dni:any,nombre:any,apellido:any){

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Turnos Que Tomo");


    let title = ["Turnos: " + nombre + " " + apellido];
    let header = ["FECHA",  "HORA" ,"ESPECIALISTA","ESPECIALIDAD"];
    let headerRow1=worksheet.addRow(title);
    let headerRow = worksheet.addRow(header);

    let nombreArchivo = "Turnos_"+nombre+"_"+apellido;

    for (let usuario of this.turnosBd) {
     if(dni == usuario.dniPaciente){
      let fila = [usuario.dia , usuario.hora,usuario.especialista,usuario.especialidad  ];
      worksheet.addRow(fila);
    }
  }
    console.log("hola");

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      file.saveAs(blob, nombreArchivo + '.xlsx');
    });
  }



}
