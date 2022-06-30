import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisTurnosAdminComponent } from 'src/app/componentes/turnos/admin/mis-turnos-admin/mis-turnos-admin.component';
import { AltaTurnosComponent } from 'src/app/componentes/turnos/alta-turnos/alta-turnos.component';
import { MisTurnosEspecialistaComponent } from 'src/app/componentes/turnos/especialista/mis-turnos-especialista/mis-turnos-especialista.component';
import { MisTurnosComponent } from 'src/app/componentes/turnos/paciente/mis-turnos/mis-turnos.component';



const routes: Routes = [
  
  
    {path: 'alta', component: AltaTurnosComponent},
    {path: 'especialista', component: MisTurnosEspecialistaComponent},
    {path: 'paciente', component: MisTurnosComponent},
    {path: 'administrador', component:MisTurnosAdminComponent },


  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosRoutingModule { }
