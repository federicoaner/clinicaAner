import { Component, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { DatePipe } from '@angular/common';
import { PdfService } from 'src/app/servicios/pdf.service';
import { Item } from 'pdfmake-wrapper';

@Component({
  selector: 'app-grafico2',
  templateUrl: './grafico2.component.html',
  styleUrls: ['./grafico2.component.scss']
})
export class Grafico2Component implements OnInit {

  coleccion: any;
  turnos: any;
  turnosBD: any;
  turnosUltimos15: any[] = [];
  contadorEspecialidad: any;
  arrTurnosPorDia: any[] = [];
  turnosxEspecialista: any[] = [];
  arrTurnosEspecilistaValidos: any[] = [];

  chart: any = null;


  diasMostrar: any;
  cantidadDias: any;
  dias: any[] = [];
  fechasValidas: any[] = [];

  constructor(private pdf: PdfService, private firebase: FirestoreService, private db: AngularFirestore, private datePipe: DatePipe) {

    this.coleccion = this.db.collection<any>('turnos');
    this.turnos = this.coleccion.valueChanges({ idField: 'id' });

  }
  title = 'Angular 9 HighCharts';
  ngOnInit(): void {



    this.turnos.subscribe((turnos: any) => {
      this.turnosBD = turnos;


     

      
  

    this.cargarDiasAnteriores();
    
    this.cargarFechas();
     
      this.validarDiasBase();

      this.validarTurnosEspecialista();

      
    this.otro();

      /*
      for(let item of this.turnosUltimos15){
        console.log("turnosultimos15 " + "dia: " + item.dia + "especialidad " +item.especialista)
      }*/

    });


    /*

    console.log("hoooooooola");

    for(let item of this.turnosUltimos15){
      console.log("ultimo chequeo :" + item.dia + " " +item.especialidad + " " +item.especialista);
    }*/

    

  }


  Descargar() {
    this.pdf.descargarPdf('turnosespecialista15dias.pdf', 'htmlData2');
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

    console.log("fechas validas: "+this.fechasValidas);


  }



  validarDiasBase(){

    for(let item of this.turnosBD){

      for(let dvalidos of  this.fechasValidas){

        if(item.dia == dvalidos ){

          this.turnosUltimos15.push(item);

        }

      }


    }


  }


  validarTurnosEspecialista() {

    this.turnosxEspecialista = [];

    let aux: any;
    let flag: boolean = false;
    let dias=[];

    for (let turno of this.turnosUltimos15) {
      

      flag = false;

      aux = {
        
        especialista: turno.especialista,
        cantidad: 1
      }
     
      for (let item of this.turnosxEspecialista) {

       
        
        if (item.especialista == aux.especialista) {
         
          
          item.cantidad++;
          flag = true;
          
        
        }
      

      }

      if (!flag) {
        
        this.turnosxEspecialista.push(aux);

      }

    }
    

  }




  highcharts3 = Highcharts;
  chartOptions3: any;


  otro() {



    let especialista = this.turnosxEspecialista.map((item: any) => {
      return item.especialista;
    });

    // console.log("dias" + dias);

    let cantidad = this.turnosxEspecialista.map((item: any) => {
      return item.cantidad;
    });



    this.chartOptions3 = Highcharts.setOptions({
      chart: {
        type: 'column',
      },
      title: {
        text: "Cantidad de Turnos por especialista ultimos 15 dias"
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
