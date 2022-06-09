import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { LoginComponent } from './componentes/login/login.component';
import { PerfilEspecialistaComponent } from './componentes/perfil-especialista/perfil-especialista.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { SeccionUsuariosComponent } from './componentes/seccion-usuarios/seccion-usuarios.component';
import { AltaTurnosComponent } from './componentes/turnos/alta-turnos/alta-turnos.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [

  {path: '', redirectTo: '/bienvenida', pathMatch: 'full'},
   
  {path:'bienvenida',component:BienvenidaComponent},
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegistroComponent},
  {path:'usuarios',component:SeccionUsuariosComponent},
  {path:'turnos/alta-turnos',component:AltaTurnosComponent},
  {path:'mi-perfil',component:PerfilEspecialistaComponent},


 


  





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
