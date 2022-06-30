import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { LoginService } from 'src/app/servicios/login.service';
import { __values } from 'tslib';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-seccion-pacientes',
  templateUrl: './seccion-pacientes.component.html',
  styleUrls: ['./seccion-pacientes.component.scss']
})
export class SeccionPacientesComponent implements OnInit {

  historiaClinica: Observable<any>;

  coleccion: any;
  histClinica: any;
  historiaClinicaBD: any[] = [];


  coleccionUsuarios: any;
  usuarios: any;
  usuariosBd: any[] = [];

  pacientesAtendidos: any[] = [];

  pacientesActuales: any;

  pacientesCarga: any[] = [];
  fechasPaciente: any[] = [];

  dniActual = "";
  banderaHistoriaClinica: boolean = false;

  constructor(private firestore: FirestoreService, public auth: LoginService, private db: AngularFirestore) {

    this.historiaClinica = this.firestore.getHistoriaClinica();
    this.pacientesActuales = this.firestore.getUsuarios();

    // this.pacientesActuales=this.pacientesAtendidos;

    this.coleccion = this.db.collection<any>('historiaClinica');
    this.histClinica = this.coleccion.valueChanges({ idField: 'id' });

    this.coleccionUsuarios = this.db.collection<any>('usuarios');
    this.usuarios = this.coleccionUsuarios.valueChanges({ idField: 'id' });

  }

  ngOnInit(): void {


    this.dniActual = "";
    this.pacientesCarga = [];

    this.histClinica.subscribe((histClinica: any) => {
      this.historiaClinicaBD = histClinica;


    });

    this.usuarios.subscribe((usuarios: any) => {
      this.pacientesCarga = [];
      this.usuariosBd = usuarios;
      // this.pacientesCarga
      this.validarPacientesAtendidos();
      this.validarPacientesBd();

      console.log(this.fechasPaciente);


    });


  }




  validarPacientesAtendidos() {


    for (let item of this.historiaClinicaBD) {

      if (item.dniEspecialista == this.auth.userInfo.dni) {

        if (this.pacientesAtendidos.includes(item.dniPaciente) === false) this.pacientesAtendidos.push(item.dniPaciente)
      }


    }


  }


  validarPacientesBd() {



    for (let item of this.usuariosBd) {

      for (let documento of this.pacientesAtendidos) {

        if (item.dni == documento) {

          this.pacientesCarga.push(item);

        }
      }
    }

  }


  validarUltimasAtenciones() {
    let aux: any;
    let flag: boolean = false;
    for (let item of this.historiaClinicaBD) {



      for (let paciente of this.pacientesCarga) {

        if (item.dniPaciente == paciente.dni) {
          aux = {
            paciente: item.dniPaciente,
            fechas: item.fecha
          }
          flag = true;
        }

        if (flag = true) {

          this.fechasPaciente.push(aux);

        }

      }

    }


  }





  cargarHistoriaClinica(item: any) {

    this.dniActual = item;
    // console.log(this.dniActual);

    this.banderaHistoriaClinica = true;
    /*
        Swal.fire({
          title: '<strong>HTML <u>example</u></strong>',
          icon: 'info',
          html:
           
          '<div class="container" > '+    
          ' <div  *ngIf="this.historiaClinica">' +
         
          '<div  *ngFor="let item of historiaClinica | async">' +
           
          '<div class= "row mx-0" style="justify-content: center;" *ngIf="this.dniActual==item.dniPaciente && this.auth.userInfo?.dni == item.dniEspecialista">'+
           '<p *ngIf="!this.historiaClinica">No hay pacientes Para Mostrar!!</p>'+
           '<div class="col card col-md-6" style="margin-top: 10px" >' +
            ' <p class="card-header text-center" style="font-size: 20px;">HISTORIA CLINICA</p>'+
             ' <hr> '+
            ' <p class="card-text" >Especialista: {{item.especialista}}</p>'+
            '  <hr> ' +
             ' <p class="card-text" >Paciente: {{item.paciente}}</p> ' +
             ' <p class="card-text">Especialidad: {{item.especialidad}}</p> '+
             ' <p class="card-text">Reseña: {{item.resenia}}</p> ' +
             ' <p class="card-text">Peso: {{item.peso}}</p> ' +
            '  <p class="card-text">Altura: {{item.altura}}</p> '+
             ' <p class="card-text">Pesion: {{item.resenia}}</p> ' +
             ' <p class="card-text">Temperatura: {{item.temperatura}}</p> ' +
            '  <div > <button class="btn-primary" (click)="cerrarHistoriaClinica()">Cerrar</button></div> '+
         
            ' </div> '+
        ' </div> '+
          ' <br> ' +
         
       '  </div>' +
         
         ' </div> ' +
         '</div> ' ,
    
         
            showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Great!',
          confirmButtonAriaLabel: 'Thumbs up, great!',
          cancelButtonText:
            '<i class="fa fa-thumbs-down"></i>',
          cancelButtonAriaLabel: 'Thumbs down'
        })*/

  }

  cerrarHistoriaClinica() {
    this.banderaHistoriaClinica = false;
  }








}

