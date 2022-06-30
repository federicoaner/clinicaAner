import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { Observable } from 'rxjs';
import { PdfService } from 'src/app/servicios/pdf.service';

@Component({
  selector: 'app-tabla-log',
  templateUrl: './tabla-log.component.html',
  styleUrls: ['./tabla-log.component.scss']
})
export class TablaLogComponent implements OnInit {

  logs : Observable<any[]>;

  constructor(private fire:FirestoreService, private pdf:PdfService) {

    this.logs=this.fire.getLogUsuarios();

   }

  ngOnInit(): void {
  }

  Descargar()
  {
    this.pdf.descargarPdf('logUsuarios.pdf', 'htmlData4');
  }
  

}
