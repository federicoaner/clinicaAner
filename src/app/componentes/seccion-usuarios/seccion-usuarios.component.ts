import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { Workbook } from 'exceljs';
import * as file from 'file-saver';
import { AngularFirestore } from '@angular/fire/compat/firestore';




@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.scss']
})
export class SeccionUsuariosComponent implements OnInit {



  tipo: any;
  listadoPacientes : Observable<any[]>;
  listadoEspecialistas: Observable<any[]>;

  coleccion : any;
  usuarios : any;
  usuariosBD : any;
  



  constructor(private firestore :FirestoreService,private db : AngularFirestore) { 

    this.listadoEspecialistas=this.firestore.getEspecialistas();
    this.listadoPacientes=this.firestore.getPacientes();

    this.coleccion = this.db.collection<any>('usuarios');
    this.usuarios = this.coleccion.valueChanges({idField: 'id'});
    



  }



  descargarExcel(){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Tabla-Usuarios");

    let header = ["NOMBRE", "APELLIDO", "DNI", "TIPO-USUARIO","EDAD", "EMAIL",];
    let headerRow = worksheet.addRow(header);

    let nombreArchivo = "TablaUsuariosClinicaAner";

    for (let usuario of this.usuariosBD) {
     
      let fila = [usuario.nombre ,  usuario.apellido , usuario.dni , usuario.tipo,usuario.edad, usuario.mail, ];
      worksheet.addRow(fila);
    }
    
    

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      file.saveAs(blob, nombreArchivo + '.xlsx');
    });
  }


  ngOnInit(): void {
    this.usuarios.subscribe((usuarios : any) => {
      this.usuariosBD = usuarios;
      
    });
  }

  cambiarVista(opcion : any){
  
    }
  }


