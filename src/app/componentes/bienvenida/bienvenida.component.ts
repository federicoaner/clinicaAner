import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss']
})
export class BienvenidaComponent implements OnInit {

  loading:boolean=false;
  constructor(private firestore:FirestoreService) { }
  //constructor(){};




  ngOnInit(): void {

  
  }

}
