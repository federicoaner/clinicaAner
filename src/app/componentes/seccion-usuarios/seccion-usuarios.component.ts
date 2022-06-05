import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.scss']
})
export class SeccionUsuariosComponent implements OnInit {



  tipo: any;
  listadoPacientes : Observable<any[]>;
  listadoEspecialistas: Observable<any[]>;

  constructor(private firestore :FirestoreService) { 

    this.listadoEspecialistas=this.firestore.getEspecialistas();
    this.listadoPacientes=this.firestore.getPacientes();



  }

  ngOnInit(): void {
  }

  cambiarVista(opcion : any){
  
    }
  }


