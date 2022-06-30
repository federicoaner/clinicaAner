import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { LoginService } from 'src/app/servicios/login.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToasterService } from 'src/app/servicios/toaster.service';
import { Observable } from 'rxjs';
import { PdfMakeWrapper, Img, Table } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-perfil-especialista',
  templateUrl: './perfil-especialista.component.html',
  styleUrls: ['./perfil-especialista.component.scss']
})
export class PerfilEspecialistaComponent implements OnInit {

  coleccion: any;
  usuarios: any;
  usuario: any;
  mostrar: boolean = false;
  arrEspecialidadesValidas: any[] = [];
  //historiaClinica:Observable<any[]>;

  coleccion2: any;
  historiaClinica: any;
  historiaClinicaBD: any;

  horasArray: any[] = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'];
  //horasArray : any[] = ['Turno Mañana', 'Turno Tarde'];
  diasArray: any[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  userHorarios: any[] = [];
  userDias: any[] = [];

  // usuario: any;
  horarios: boolean = false;
  verHorariosBtn: string = 'Ver horarios';


  constructor(public auth: LoginService, private db: AngularFirestore, private firestore: FirestoreService, private toaster: ToasterService, private datePipe: DatePipe) {

    this.coleccion = this.db.collection<any>('usuarios');
    this.usuarios = this.coleccion.valueChanges({ idField: 'id' });


    this.coleccion2 = this.db.collection<any>('historiaClinica');
    this.historiaClinica = this.coleccion2.valueChanges({ idField: 'id' });

  }


  ngOnInit(): void {

    this.usuarios.subscribe((usuarios: any) => {

      for (let item of usuarios) {
        if (item.dni == this.auth.userInfo.dni) {
          this.usuario = item;
          break;
        }
      }
    });


    this.historiaClinica.subscribe((historiaClinica: any) => {


      this.historiaClinicaBD = historiaClinica;


      this.validarEspecialidades();
    });

  }


  async crearPDF(especialidad: any) {
    PdfMakeWrapper.setFonts(pdfFonts);
    const pdf = new PdfMakeWrapper();
    pdf.add((await new Img('./../../../assets/clinica.png').width(100).alignment('center').build()))
    let fecha = new Date();
    pdf.pageSize('A4');
    pdf.pageMargins(40);

    pdf.footer(("emision:") + this.datePipe.transform(fecha, 'dd/MM/yyyy'));
    pdf.add({ text: 'Historia clinica', alignment: 'center', fontSize: 22, bold: true, margin: [50, 20] })
    pdf.add({ text: 'Nombre :' + this.auth.userInfo.nombre + "," + this.auth.userInfo.apellido, alignment: 'left', fontSize: 14, bold: true, margin: [5, 5] })
    //pdf.add({text: 'Especialidad :' + especialidad.especialidad.toUpperCase(), alignment: 'left',fontSize: 14, bold: true,  margin: [5, 5]})

    this.historiaClinicaBD.forEach((item: any) => {

      if (item.dniPaciente == this.auth.userInfo.dni && item.especialidad == especialidad) {
        console.log(item);

        // pdf.add({text: '----------------------------------------------------------' , alignment: 'left',fontSize: 14, bold: true,  margin: [5, 5]});
        pdf.add({ text: 'Peso :' + item.peso, alignment: 'left', fontSize: 14, bold: true, margin: [5, 5] });
        pdf.add({ text: 'Altura :' + item.altura, alignment: 'left', fontSize: 14, bold: true, margin: [5, 5] });
        pdf.add({ text: 'Temperatura :' + item.temperatura, alignment: 'left', fontSize: 14, bold: true, margin: [5, 5] });
        pdf.add({ text: 'Especialista:' + item.especialista, alignment: 'left', fontSize: 14, bold: true, margin: [5, 5] });
        pdf.add({ text: 'Especialidad:' + item.especialidad, alignment: 'left', fontSize: 14, bold: true, margin: [5, 5] });
        pdf.add({ text: 'Fecha: ' + item.fecha + " - " + item.hora + "hs", alignment: 'left', fontSize: 14, bold: true, margin: [5, 5] });
        pdf.add({ text: '----------------------------------------------------------', alignment: 'left', fontSize: 14, bold: true, margin: [5, 5] });


      }

    });

    pdf.create().download();


  }



  validarEspecialidades() {

    let index: any;
    let especialidad: any;

    for (let item of this.historiaClinicaBD) {
      if (item.dniPaciente == this.auth.userInfo.dni) {
        especialidad = item.especialidad
        index = this.arrEspecialidadesValidas.indexOf(especialidad);
        if (index == -1) {
          this.arrEspecialidadesValidas.push(especialidad);


        }
      }

    }

    console.log("especialidades" + this.arrEspecialidadesValidas);

  }



  verHorarios() {

   
    this.horarios = !this.horarios;
    if (this.horarios) {
      this.verHorariosBtn = "Ocultar horarios";
    }
    else {
      this.verHorariosBtn = "Ver horarios";
      

    }
  }

  elegirHorario(opcion: any) {

    let flag: boolean = false;
    let pos: any;

    if (this.userHorarios.length > 0) {

      for (let i = 0; i < this.userHorarios.length; i++) {

        if (opcion === this.userHorarios[i]) {
          flag = true;
          pos = i;
          break;
        }
      }

      if (flag === true) {
        this.userHorarios = this.userHorarios.filter((i) => i != opcion);
      } else {
        this.userHorarios.push(opcion);
      }
    } else {
      this.userHorarios.push(opcion);
    }

    console.log(this.userHorarios)
  }


  elegirDia(opcion: any) {

    let flag: boolean = false;
    let pos: any;

    if (this.userDias.length > 0) {

      for (let i = 0; i < this.userDias.length; i++) {

        if (opcion === this.userDias[i]) {
          flag = true;
          pos = i;
          break;
        }
      }


      if (flag === true) {
        this.userDias = this.userDias.filter((i) => i != opcion);
      } else {
        this.userDias.push(opcion);
      }
    } else {
      this.userDias.push(opcion);
    }

    //console.log(this.userDias)
  }

  enviarHorarios() {

    let mañana = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00'];
    let tarde = ['13:30', '14:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'];

    if (this.userHorarios.length > 0) {

      let aux: any;
      aux = this.usuario;


      aux.horarios = this.userHorarios;
      aux.dias = this.userDias;



      console.log(aux);

      this.firestore.modificarUsuarios(aux, this.usuario.id);

      this.toaster.mostrarToastSuccess('Se asignaros los horarios', '!!!');
      this.userHorarios = [];
      this.userDias = [];

    } else {
      this.toaster.mostrarToastFail('error', 'Se debe seleccionar un horario!!');
    }
  }


  generarPdf() {

    const pdf = new PdfMakeWrapper();
    pdf.add(
      ('hello')
    );
    pdf.create().download();
  }






 












}//fin clase


