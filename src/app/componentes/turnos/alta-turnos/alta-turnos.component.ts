import { Component, OnInit, } from '@angular/core';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { LoginService } from 'src/app/servicios/login.service';
import { ToasterService } from 'src/app/servicios/toaster.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-alta-turnos',
  templateUrl: './alta-turnos.component.html',
  styleUrls: ['./alta-turnos.component.scss']
})
export class AltaTurnosComponent implements OnInit {

  listadoEspecialistas: Observable<any[]>;
  especialidadActual: string[] = [];
  mostrarDias: boolean = false;
  mostrarFechas: boolean = false;
  dias: any[] = [];
  fechasValidas: any[] = [];
  diasValidos: any[] = [];
  especialistaSeleccionadox: any;
  fechaA: string = "";
  fechaSeleccionada: any;
  horaSeleccionada: any;
  horasValidas: any[] = [];
  mostrarHoras: boolean = false;
  flag2: boolean = false;

  banderaFoto1: boolean = false;
  banderaFoto2: boolean = false;
  especialidadDistinta = "";
  especialidadElegida = "";
  especialidadEnviar = "";

  fechaHoraMostrar: any[] = [];
  fechaHoraProhibida: any[] = [];
  fechaHoraPosta: any[] = [];

  dniPaciente: any;
  nombrePaciente: any;
  apellidoPaciente: any;
  banderaAdmin: boolean = false;

  sonidoOk: HTMLAudioElement = new Audio("./assets/sonidook.m4a");


  constructor(private fire: FirestoreService, private datePipe: DatePipe, public auth: LoginService, private toast: ToasterService, private ruter: Router) {

    this.listadoEspecialistas = this.fire.getUsuarios();

  }


  adminPase(item: any) {

    this.banderaAdmin = true;
    this.dniPaciente = item.dni;
    this.nombrePaciente = item.nombre;
    this.apellidoPaciente = item.apellido;

  }

  especialistaSeleccionado(item: any) {
    console.log(item.nombre);
    this.flag2 = true;

    this.especialidadActual = item.especialidad;



    this.especialistaSeleccionadox = item;
    console.log("especialidadActial:  " + this.especialistaSeleccionadox.especialidad);

    for (let item of this.especialidadActual) {
      if (item != "traumatologia" && item != "pediatra" && item != "cadiologia") {

        this.especialidadDistinta = item;
      }

      for (let item of this.especialidadActual) {
        if (item == "traumatologo" || item == "pediatra" || item == "cardiologo") {

          this.especialidadElegida = item;
        }
      }

    }

    this.seleccionFechaTurno();



  }

  seleccionFechaTurno() {

    this.cargarFechas();
  }

  cargarFechas() {
    this.dias = [];
    let fecha = new Date();
    for (let i = 0; i < 15; i++) {
      fecha.setDate(fecha.getDate() + 1);
      if (fecha.getDay() != 0) {
        this.dias.push(new Date(fecha));
      }
      else {
        i--;
      }
    }


    this.getFechasValidas();
  }

  getFechasValidas() {

    let aux: any[] = [];
    let retorno: any[] = [];
    let fecha = new Date();



    for (let item of this.especialistaSeleccionadox.dias) {
      switch (item) {
        case 'Lunes':
          aux.push(1);
          break;
        case 'Martes':
          aux.push(2);
          break;
        case 'Miercoles':
          aux.push(3);
          break;
        case 'Jueves':
          aux.push(4);
          break;
        case 'Viernes':
          aux.push(5);
          break;
        case 'Sabado':
          aux.push(6);
          break;
      }
    }

    console.log("paso ´por fechasvalidas")

    for (let item of this.dias) {
      fecha.setDate(item.getDate());
      if (aux.includes(fecha.getDay())) {
        console.log(fecha.getDay())
        retorno.push(item);
      }
    }


    this.diasValidos = retorno;


  }


  mostrarDiasC(item: any) {

    this.mostrarDias = true;
    this.especialidadEnviar = item;

    console.log("item recibido:" + item);

  }



  btnDia(opcion: any) {
    this.mostrarDias = false

    let aux: any;
    let fecha = new Date()
    let retorno: any[] = [];

    switch (opcion) {
      case 'Lunes':
        aux = 1;
        break;
      case 'Martes':
        aux = 2;
        break;
      case 'Miercoles':
        aux = 3;
        break;
      case 'Jueves':
        aux = 4;
        break;
      case 'Viernes':
        aux = 5;
        break;
      case 'Sabado':
        aux = 6;
        break;
    }


    let dia = aux;
    let primerdiaAcargar = this.buscar(dia);
    let segundodiaAcargar = this.buscar2(dia);

    primerdiaAcargar = this.datePipe.transform(primerdiaAcargar, 'dd-MM');
    segundodiaAcargar = this.datePipe.transform(segundodiaAcargar, 'dd-MM');
    // console.log(primerdiaAcargar);
    //console.log(segundodiaAcargar);

    retorno.push(primerdiaAcargar);
    retorno.push(segundodiaAcargar);


    this.fechasValidas = retorno;
    this.mostrarFechas = true;

    console.log("fechas validas: " + this.fechasValidas);

    this.horasValidas = this.especialistaSeleccionadox.horarios.map((item: any) => item);


    for (let horas of this.horasValidas) {

      for (let dias of this.fechasValidas) {
        this.fechaHoraMostrar.push(dias + " " + horas);
      }
    }

    for (let fechas of this.especialistaSeleccionadox.turnos) {
      this.fechaHoraProhibida.push(fechas);

    }

    let index: any;

    for (let item of this.fechaHoraMostrar) {
      console.log(item);
      let cont = 0;

      for (let horaProhibida of this.fechaHoraProhibida) {
        if (horaProhibida == item) {
          console.log("entro");
          index = this.fechaHoraMostrar.indexOf(item);
          console.log("indice", index);
          if (index != -1) {
            this.fechaHoraMostrar.splice(index, 1);

            this.fechaHoraPosta.push(this.fechaHoraMostrar);
          }
        }
      }

    }

  }



  buscar(dia: any) {
    var moment = require('moment');
    const diaRequerido = dia;
    const hoy = moment().isoWeekday();

    if (hoy <= diaRequerido) {
      console.log(moment().isoWeekday(diaRequerido))
      return moment().isoWeekday(diaRequerido);
    } else {
      /*Si no pertenece a la semana actual ir a proxima semana */
      return moment().add(1, 'weeks').isoWeekday(diaRequerido);
    }
  }

  buscar2(dia: any) {
    var moment = require('moment');
    const diaRequerido = dia;
    const hoy = moment().isoWeekday();


    return moment().add(1, 'weeks').isoWeekday(diaRequerido);

  }


  enviar(item: any) {

    var splitted = item.split(" ", 2);

    let fecha = splitted[0];
    let hora = splitted[1];

    console.log(splitted);
    console.log(fecha);
    console.log(hora);


    this.fechaSeleccionada = fecha,
      this.horaSeleccionada = hora;


    this.mandarTurno();


  }


  mandarTurno() {



    if (this.auth.userInfo.tipo == 'paciente') {
      this.dniPaciente = this.auth.userInfo.dni
      this.nombrePaciente = this.auth.userInfo.nombre;
      this.apellidoPaciente = this.auth.userInfo.apellido;

    }

    let turno = {
      dniPaciente: this.dniPaciente,
      paciente: this.nombrePaciente + ' ' + this.apellidoPaciente,
      dniEspecialista: this.especialistaSeleccionadox.dni,
      especialista: this.especialistaSeleccionadox.nombre + ' ' + this.especialistaSeleccionadox.apellido,
      dia: this.fechaSeleccionada,
      hora: this.horaSeleccionada,
      aceptado: false,
      realizado: false,
      rechazado: false,
      especialidad: this.especialidadEnviar,
    }



    let fechaTurno = this.fechaSeleccionada + " " + this.horaSeleccionada;




    if (!turno.dniPaciente) {

      this.toast.mostrarToastSuccess("error", "No hay ningun paciente logueado!!");

    }
    let auxTurno: any;

    auxTurno = {

      dia: this.fechaSeleccionada,
      hora: this.horaSeleccionada,
    }


    if (this.especialistaSeleccionadox.turnos == null) {


      this.especialistaSeleccionadox.turnos = fechaTurno;
    } else {
      this.especialistaSeleccionadox.turnos.push(fechaTurno);
    }

    this.fire.modificarUsuarios(this.especialistaSeleccionadox, this.especialistaSeleccionadox.id);
    this.fire.agregarTurno(turno);


    this.sonidoOk.play();

    Swal.fire({

      position: 'center',
      icon: 'success',
      title: 'Turno Asignado!!',
      showConfirmButton: false,
      timer: 1500


    }).then(() => {


      this.ruter.navigateByUrl("");

    });


  }



  ngOnInit(): void {
  }

}
