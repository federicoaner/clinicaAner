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
    RecaptchaModule
  
  /*  provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())*/
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
