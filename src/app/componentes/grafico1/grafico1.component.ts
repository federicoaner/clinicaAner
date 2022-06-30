import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { PdfService } from 'src/app/servicios/pdf.service';

@Component({
  selector: 'app-grafico1',
  templateUrl: './grafico1.component.html',
  styleUrls: ['./grafico1.component.scss']
})
export class Grafico1Component implements OnInit {

  coleccion: any;
  turnos: any;
  turnosBD: any;
  contadorEspecialidad: any;
  turnoxDia: any[] = [];

  chart: any = null;


  diasMostrar: any;
  cantidadDias: any;

  constructor(private pdf: PdfService, private firebase: FirestoreService, private db: AngularFirestore) {

    this.coleccion = this.db.collection<any>('turnos');
    this.turnos = this.coleccion.valueChanges({ idField: 'id' });

  }
  title = 'Angular 9 HighCharts';
  ngOnInit(): void {


    this.turnos.subscribe((turnos: any) => {
      this.turnosBD = turnos;

      this.cargarTurnosxDia();

      this.otro();

    });
  }


  cargarTurnosxDia() {

    this.turnoxDia = [];

    let aux: any;
    let flag: boolean = false;

    for (let turno of this.turnosBD) {

      flag = false;
      aux = {
        dia: turno.dia,
        cantidad: 1
      }

      for (let item of this.turnoxDia) {
        if (item.dia == aux.dia) {
          item.cantidad++;
          flag = true;
        }
      }

      if (!flag) {
        this.turnoxDia.push(aux);
      }

    }

  }

  Descargar() {
    this.pdf.descargarPdf('cantidadTurnosporDia.pdf', 'htmlData');
  }




  highcharts3 = Highcharts;
  chartOptions3: any;


  otro() {

    let dias = this.turnoxDia.map((item: any) => {
      return item.dia;
    });


    let cantidad = this.turnoxDia.map((item: any) => {
      return item.cantidad;
    });


    this.chartOptions3 = Highcharts.setOptions({
      chart: {
        type: 'column',
      },
      title: {
        text: "Cantidad de Turnos por dia"
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      xAxis: {
        categories: dias,
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
