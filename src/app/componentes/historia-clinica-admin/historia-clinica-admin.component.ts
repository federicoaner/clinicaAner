import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { LoginService } from 'src/app/servicios/login.service';
import { ToasterService } from 'src/app/servicios/toaster.service';
@Component({
  selector: 'app-historia-clinica-admin',
  templateUrl: './historia-clinica-admin.component.html',
  styleUrls: ['./historia-clinica-admin.component.scss']
})
export class HistoriaClinicaAdminComponent implements OnInit {

  historiaClinica:Observable<any[]>;

  constructor(public auth : LoginService,  private db : AngularFirestore, private firestore : FirestoreService, private toaster:ToasterService) {

    this.historiaClinica=this.firestore.getHistoriaClinica();
   }

  ngOnInit(): void {
  }

}
