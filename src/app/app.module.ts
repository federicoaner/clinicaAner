import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { RueditaComponent } from './componentes/ruedita/ruedita.component';
import { SeccionUsuariosComponent } from './componentes/seccion-usuarios/seccion-usuarios.component';
import { TablaPacientesComponent } from './componentes/tabla-pacientes/tabla-pacientes.component';
import { TablaEspecialistasComponent } from './componentes/tabla-especialistas/tabla-especialistas.component';
import { RegistroAdminComponent } from './componentes/registro-admin/registro-admin.component';
import { TablaAdministradoresComponent } from './componentes/tabla-administradores/tabla-administradores.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, DatePipe } from '@angular/common';
import { AltaTurnosComponent } from './componentes/turnos/alta-turnos/alta-turnos.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { PerfilEspecialistaComponent } from './componentes/perfil-especialista/perfil-especialista.component';


import { MisTurnosEspecialistaComponent } from './componentes/turnos/especialista/mis-turnos-especialista/mis-turnos-especialista.component';
import { TablaTurnosEspecialistaComponent } from './componentes/turnos/especialista/tabla-turnos-especialista/tabla-turnos-especialista.component';
import { TablaTurnosPacienteComponent } from './componentes/turnos/paciente/tabla-turnos-paciente/tabla-turnos-paciente.component';
import { MisTurnosComponent } from './componentes/turnos/paciente/mis-turnos/mis-turnos.component';
import { SeccionPacientesComponent } from './componentes/seccion-pacientes/seccion-pacientes.component';
import { HistoriaClinicaAdminComponent } from './componentes/historia-clinica-admin/historia-clinica-admin.component';
import { TablaTurnosAdminComponent } from './componentes/turnos/admin/tabla-turnos-admin/tabla-turnos-admin.component';
import { MisTurnosAdminComponent } from './componentes/turnos/admin/mis-turnos-admin/mis-turnos-admin.component';
import { InformesComponent } from './componentes/informes/informes.component';
import { HighchartsChartComponent, HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { MayusculaPipe } from './pipes/mayuscula.pipe';
import { TodoMayusculaPipe } from './pipes/todo-mayuscula.pipe';
import { EdadPipe } from './pipes/edad.pipe';
import { Directiva1Directive } from './directivas/directiva1.directive';
import { ImagenDirective } from './directivas/imagen.directive';
import { ColoresDirective } from './directivas/colores.directive';
import { Grafico1Component } from './componentes/grafico1/grafico1.component';
import { Grafico2Component } from './componentes/grafico2/grafico2.component';
import { Grafico3Component } from './componentes/grafico3/grafico3.component';
import { TablaLogComponent } from './componentes/tabla-log/tabla-log.component';
//import { ChartsModule } from 'ng2-charts/ng2-charts';
//import { ChartsModule } from 'ng2-charts';



//import { PdfMakeWrapper } from 'pdfmake-wrapper';
//import pdfFonts from "pdfmake/build/vfs_fonts"
//import {PdfComponent} from './pdf/pdf.component';


@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    LoginComponent,
    RegistroComponent,
    RueditaComponent,
    SeccionUsuariosComponent,
    TablaPacientesComponent,
    TablaEspecialistasComponent,
    RegistroAdminComponent,
    TablaAdministradoresComponent,
    AltaTurnosComponent,
    PerfilEspecialistaComponent,
    
   

    MisTurnosEspecialistaComponent,
    TablaTurnosEspecialistaComponent,
    TablaTurnosPacienteComponent,
    MisTurnosComponent,
    SeccionPacientesComponent,
    HistoriaClinicaAdminComponent,
    TablaTurnosAdminComponent,
    MisTurnosAdminComponent,
    InformesComponent,
    MayusculaPipe,
    TodoMayusculaPipe,
    EdadPipe,
    Directiva1Directive,
    ImagenDirective,
    ColoresDirective,
    Grafico1Component,
    Grafico2Component,
    Grafico3Component,
    TablaLogComponent,
   // PdfComponent
  
  
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
   //toastr
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      
      

     
    }),
    
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RecaptchaModule,
   
    
    HighchartsChartModule,
    //ChartsModule
    //ChartsModule,
    
    
    
  
  /*  provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())*/
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
