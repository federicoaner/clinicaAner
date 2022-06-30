import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as Highcharts2 from 'highcharts';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { type } from 'os';
import { PdfService } from 'src/app/servicios/pdf.service';





@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss']
})
export class InformesComponent implements OnInit {


  
  especialidadesMostrar: any;
  cantidadEspecialidadesMostrar: any;
  contadorEspecialidad: any;
  arrEspecialidadesTurnos: any[] = [];
  chart: any = null;
  coleccion: any;
  turnos: any;
  turnosBD: any;





  constructor(private firebase: FirestoreService, private db: AngularFirestore, private pdf: PdfService) {

    this.coleccion = this.db.collection<any>('turnos');
    this.turnos = this.coleccion.valueChanges({ idField: 'id' });

  }

  title = 'Angular 9 HighCharts';
  ngOnInit(): void {




    this.turnos.subscribe((turnos: any) => {
      this.turnosBD = turnos;

      this.cantidadEspecialidades();

      this.armarGraficoHighChart();
    


    });




  }


  cantidadEspecialidades() {

    let aux: any;
    let flag: boolean = false;

    for (let turno of this.turnosBD) {

      flag = false;

      aux = {
        especialidad: turno.especialidad,
        cantidad: 1
      }

      for (let item of this.arrEspecialidadesTurnos) {
        if (item.especialidad == aux.especialidad) {
          item.cantidad++;
          flag = true;
        }
      }

      if (!flag) {
        this.arrEspecialidadesTurnos.push(aux);
      }

    }


    this.especialidadesMostrar = this.arrEspecialidadesTurnos.map((item: any) => {
      return item.especialidad;
    });

    this.cantidadEspecialidadesMostrar = this.arrEspecialidadesTurnos.map((item: any) => {
      return item.cantidad;
    });




  }




  highcharts2 = Highcharts;
  chartOptions2: any;
  armarGraficoHighChart() {

    let especialidad: string[] = this.arrEspecialidadesTurnos.map((item: any) => {
      return item.especialidad.toString();
    });

    let cantidad = this.arrEspecialidadesTurnos.map((item: any) => {
      return item.cantidad;
    });

    this.chartOptions2 = Highcharts.setOptions({
      chart: {
        type: 'bar',
      },
      title: {
        text: "Cantidad de Turnos por especialidad"
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      xAxis: {
        categories: especialidad,
        crosshair: true
      },

      series: [
        {
          name: 'Especialidad',
          data: cantidad,
          type: 'column'
        }
      ]
    })
  }


  DescargarPdf() {
    this.pdf.descargarPdf('turnosporEspecialidad.pdf', 'htmlData1');
  }





}
