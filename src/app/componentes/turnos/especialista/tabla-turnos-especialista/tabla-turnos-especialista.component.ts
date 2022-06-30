import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { LoginService } from 'src/app/servicios/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tabla-turnos-especialista',
  templateUrl: './tabla-turnos-especialista.component.html',
  styleUrls: ['./tabla-turnos-especialista.component.scss']
})
export class TablaTurnosEspecialistaComponent implements OnInit {


  @Output() rechazar = new EventEmitter();
  @Output() finalizar = new EventEmitter();
  @Output() reseniaOutput = new EventEmitter();

  filtro: string = "";


  usuarioActual: any;
  mostrarReseniaBandera: boolean = false;
  reseniaAMostrar: string = "";
  turnosValidos: any[] = [];
  turnosAMostrar: any[] = [];
  arrEspecialistasValidos: any[] = [];
  arrEspecialidadesValidas: any[] = [];
  arrPacientesValidos: any[] = [];
  coleccion: any;
  turnos: any;
  turnosBD: any;



  constructor(private firebase: FirestoreService, private db: AngularFirestore, private auth: LoginService) {


    this.coleccion = this.db.collection<any>('turnos');
    this.turnos = this.coleccion.valueChanges({ idField: 'id' });
    // this.usuarioActual=this.auth.userInfo;
  }


  ngOnInit(): void {

    this.turnos.subscribe((turnos: any) => {
      this.turnosBD = turnos;
      this.validarTurnos();
      this.validarPacientes();
      this.validarEspecialidades();
    });

  }


  verEncuesta(item: any) {


    Swal.fire({
      title: "Encuesta:",
      text: item.comentarioEncuesta,
    }).then((result) => {
      if (result.value) {

      }
    });

  }

  validarTurnos() {

    this.turnosValidos = [];

    for (let item of this.turnosBD) {
      if (this.auth.userInfo.dni == item.dniEspecialista) {

        this.turnosValidos.push(item);

      }
    }

    this.turnosAMostrar = this.turnosValidos;

  }

  validarPacientes() {

    let index: any;
    let paciente: any;

    for (let item of this.turnosValidos) {
      paciente = item.paciente
      index = this.arrPacientesValidos.indexOf(paciente);
      if (index == -1) {
        this.arrPacientesValidos.push(paciente);
      }
    }

    // console.log("---------" +this.arrEspecialistasValidos);
  }


  validarEspecialidades() {

    let index: any;
    let especialidad: any;

    for (let item of this.turnosValidos) {
      especialidad = item.especialidad
      index = this.arrEspecialidadesValidas.indexOf(especialidad);
      if (index == -1) {
        this.arrEspecialidadesValidas.push(especialidad);
      }
    }
  }

  filtroPacientes(paciente: any) {



    this.turnosAMostrar = [];

    if (paciente != null) {

      for (let item of this.turnosValidos) {
        if (item.paciente == paciente) {
          this.turnosAMostrar.push(item);
        }
      }
    } else {
      this.turnosAMostrar = this.turnosValidos;
    }



  }

  filtroEspecialidades(especialidad: any) {

    this.turnosAMostrar = [];

    if (especialidad != null) {

      for (let item of this.turnosValidos) {
        if (item.especialidad == especialidad) {
          this.turnosAMostrar.push(item);
        }
      }
    } else {
      this.turnosAMostrar = this.turnosValidos;
    }



  }

  btnReset() {

    this.turnosAMostrar = this.turnosValidos;
  }

  cancelarTurno(item: any) {
    console.log(this.usuarioActual);

    let it: any;

    it = item;
    it.cancelado = true;
    it.aceptado = false;


    this.firebase.modificarTurno(it, it.id);
  }

  aceptarTurno(item: any) {
    console.log(this.usuarioActual);

    let it: any;

    it = item;
    it.aceptado = true;


    this.firebase.modificarTurno(it, it.id);
  }

  rechazarTurno(item: any) {
    this.rechazar.emit(item)
  }

  finalizarTurno(item: any) {
    console.log("asdasd");
    this.finalizar.emit(item)
  }


  verResenia(item: any) {


    Swal.fire({
      title: "Reseña:",
      text: item.resenia,
    }).then((result) => {
      if (result.value) {

      }
    });

  }

  cerrarResenia() {
    this.mostrarReseniaBandera = false;
  }

  filtrar() {



    let filtro = (<HTMLInputElement>document.getElementById('filtro')).value.toString();


    let array: any[] = [];
    let index: any;




    filtro = filtro.toLowerCase();

    for (let item of this.turnosValidos) {

      if (filtro.includes("cancelado")) {
        if (item.cancelado) {
          index = array.indexOf(item);
          if (index == -1) {
            array.push(item)
          }
        }
      }

      if (filtro.includes("realizado")) {
        if (item.realizado) {
          index = array.indexOf(item);
          if (index == -1) {
            array.push(item)
          }
        }
      }

      if (filtro.includes("rechazado")) {
        if (item.rechazado) {
          index = array.indexOf(item);
          if (index == -1) {
            array.push(item)
          }
        }
      }

      if (filtro.includes("reseña")) {
        if (item.realizado) {
          index = array.indexOf(item);
          if (index == -1) {
            array.push(item)
          }
        }
      }

      if (filtro.includes("especialidad")) {
        if (item.especialidad) {
          index = array.indexOf(item);
          if (index == -1) {
            array.push(item)
          }
        }
      }

      if (filtro.includes("paciente")) {
        if (item.paciente) {
          index = array.indexOf(item);
          if (index == -1) {
            array.push(item)
          }
        }
      }

      if (filtro.includes("hora")) {
        if (item.hora) {
          index = array.indexOf(item);
          if (index == -1) {
            array.push(item)
          }
        }
      }

      if (item.dniPaciente.toString().includes(filtro)) {
        index = array.indexOf(item);
        if (index == -1) {
          array.push(item)
        }
      }

      if (item.especialidad.toLowerCase().includes(filtro)) {
        index = array.indexOf(item);
        if (index == -1) {
          array.push(item)
        }
      }

      if (item.especialista.toLowerCase().includes(filtro)) {
        index = array.indexOf(item);
        if (index == -1) {
          array.push(item)
        }
      }

      if (item.paciente.toLowerCase().includes(filtro)) {
        index = array.indexOf(item);
        if (index == -1) {
          array.push(item)
        }
      }

    }

    this.turnosAMostrar = array;
  }



}
