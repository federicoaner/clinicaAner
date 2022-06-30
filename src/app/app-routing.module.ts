import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { InformesComponent } from './componentes/informes/informes.component';
import { LoginComponent } from './componentes/login/login.component';

import { PerfilEspecialistaComponent } from './componentes/perfil-especialista/perfil-especialista.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { SeccionPacientesComponent } from './componentes/seccion-pacientes/seccion-pacientes.component';
import { SeccionUsuariosComponent } from './componentes/seccion-usuarios/seccion-usuarios.component';
import { AltaTurnosComponent } from './componentes/turnos/alta-turnos/alta-turnos.component';
import { AdminGuard } from './guards/admin.guard';


const routes: Routes = [

  {path: '', redirectTo: '/bienvenida', pathMatch: 'full'},
   
  {path:'bienvenida',component:BienvenidaComponent},
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegistroComponent},
  {path:'usuarios',component:SeccionUsuariosComponent, canActivate: [AdminGuard]},
 // {path:'turnos/alta-turnos',component:AltaTurnosComponent},
  {path:'mi-perfil',component:PerfilEspecialistaComponent},
  {path:'seccion-pacientes',component:SeccionPacientesComponent},
  {path:'informes',component:InformesComponent,canActivate: [AdminGuard]},

  { path: 'turnos', loadChildren: () => import('./lazy/turnos/turnos.module').then(m => m.TurnosModule) },





 


  





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
