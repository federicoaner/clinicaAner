import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { DatePipe } from '@angular/common';
import { PdfService } from 'src/app/servicios/pdf.service';

@Component({
  selector: 'app-grafico3',
  templateUrl: './grafico3.component.html',
  styleUrls: ['./grafico3.component.scss']
})
export class Grafico3Component implements OnInit {

  coleccion: any;
  turnos: any;
  turnosBD: any;
  turnosUltimos15: any[] = [];
  contadorEspecialidad: any;
  arrTurnosPorDia: any[] = [];
  arrTurnosEspecialista: any[] = [];
  arrTurnosEspecilistaValidos: any[] = [];

  chart: any = null;


  diasMostrar: any;
  cantidadDias: any;
  dias: any[] = [];
  fechasValidas: any[] = [];

  constructor(private pdf: PdfService, private firebase: FirestoreService, private db: AngularFirestore, private datePipe: DatePipe) {

    this.coleccion = this.db.collection<any>('historiaClinica');
    this.turnos = this.coleccion.valueChanges({ idField: 'id' });

  }
  title = 'Angular 9 HighCharts';
  ngOnInit(): void {




    this.turnos.subscribe((turnos: any) => {
      this.turnosBD = turnos;


      this.cargarDiasAnteriores();
      this.cargarFechas();
      this.validarDiasBase();
      this.cargarDiasAnteriores();
      this.validarTurnosEspecialista();


      this.otro();

    });





  }


  Descargar() {
    this.pdf.descargarPdf('turnosFinalizados15dias.pdf', 'htmlData3');
  }



  cargarDiasAnteriores() {
    this.dias = [];


    var fecha = new Date();
    fecha.setDate(fecha.getDate() - 16);

    for (let i = 0; i < 14; i++) {
      fecha.setDate(fecha.getDate() + 1);
      if (fecha.getDay() != 0) {
        this.dias.push(new Date(fecha));
      }
      else {
        i--;
      }
    }


  }

  cargarFechas() {

    let fecha = new Date();
    let aux: any;
    let retorno: any[] = [];

    for (let item of this.dias) {
      fecha.setDate(item.getDate());

      item = this.datePipe.transform(item, 'dd-MM');
      retorno.push(item);



    }

    this.fechasValidas = retorno;


  }




  validarDiasBase() {

    for (let item of this.turnosBD) {

      for (let dvalidos of this.fechasValidas) {

        if (item.fecha == dvalidos) {

          this.turnosUltimos15.push(item);

        }

      }

    }

  //  console.log("dias 15 en grafico 3" + this.turnosUltimos15);
  }


  validarTurnosEspecialista() {

    this.arrTurnosEspecialista = [];

    let aux: any;
    let flag: boolean = false;

    for (let turno of this.turnosUltimos15) {



      flag = false;

      aux = {
        dia: turno.dia,
        especialista: turno.especialista,
        cantidad: 1
      }

      for (let item of this.arrTurnosEspecialista) {



        if (item.especialista == aux.especialista) {
          item.cantidad++;
          flag = true;
        }


      }

      if (!flag) {


        this.arrTurnosEspecialista.push(aux);


      }


    }


  }


  highcharts3 = Highcharts;
  chartOptions3: any;


  otro() {


    let especialista = this.arrTurnosEspecialista.map((item: any) => {
      return item.especialista;
    });

    // console.log("dias" + dias);

    let cantidad = this.arrTurnosEspecialista.map((item: any) => {
      return item.cantidad;
    });



    this.chartOptions3 = Highcharts.setOptions({
      chart: {
        type: 'bar',
      },
      title: {
        text: "Cantidad de Turnos finalizados por especialista ultimos 15 dias"
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      xAxis: {
        categories: especialista,
        crosshair: true
      },
      series: [
        {
          name: 'Cantidad',
          data: cantidad,
          type: 'column'
        }
      ]
    })
  }





}
