import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { LoginService } from 'src/app/servicios/login.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToasterService } from 'src/app/servicios/toaster.service';


@Component({
  selector: 'app-perfil-especialista',
  templateUrl: './perfil-especialista.component.html',
  styleUrls: ['./perfil-especialista.component.scss']
})
export class PerfilEspecialistaComponent implements OnInit {

  coleccion : any;
  usuarios : any;
  usuario : any;
  mostrar:boolean=false;

  horasArray : any[] = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'];
  //horasArray : any[] = ['Turno Mañana', 'Turno Tarde'];
  diasArray : any[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  userHorarios : any[] = [];    
  userDias : any[] = [];      

 // usuario: any;
  horarios: boolean = false;
  verHorariosBtn: string = 'Ver horarios';

  constructor(public auth : LoginService,  private db : AngularFirestore, private firestore : FirestoreService, private toaster:ToasterService) {

    this.coleccion = this.db.collection<any>('usuarios');
    this.usuarios = this.coleccion.valueChanges({idField: 'id'});

   }


   verHorarios(){

    //this.mostrar=true;
    this.horarios = !this.horarios;
    if(this.horarios)
    {
      this.verHorariosBtn = "Ocultar horarios";
    }
    else
    {
      this.verHorariosBtn = "Ver horarios";
      //this.flag=true
     
    }
  }

  seleccionHorario(opcion : any) {

    let flag : boolean = false;
    let pos : any;

    if(this.userHorarios.length > 0) {

      for(let i = 0; i < this.userHorarios.length; i++) {

        if(opcion === this.userHorarios[i]){
          flag = true;
          pos = i;
          break;
        }
      }

      if(flag === true){
        this.userHorarios = this.userHorarios.filter((i) => i != opcion);
      }else{
        this.userHorarios.push(opcion);
      }
    }else{
      this.userHorarios.push(opcion);
    }

    console.log(this.userHorarios)
  }


    seleccionDia(opcion : any) {

      let flag : boolean = false;
      let pos : any;

      if(this.userDias.length > 0) {

        for(let i = 0; i < this.userDias.length; i++) {

          if(opcion === this.userDias[i]){
            flag = true;
            pos = i;
            break;
          }
        }

        if(flag === true){
          this.userDias = this.userDias.filter((i) => i != opcion);
        }else{
          this.userDias.push(opcion);
        }
      }else{
        this.userDias.push(opcion);
      }

      console.log(this.userDias)
    }

    enviarHorarios(){

      let mañana=['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00'];
      let tarde=['13:30', '14:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'];

      if(this.userHorarios.length > 0){
       
        let aux : any;
        aux = this.usuario;
        
        
        aux.horarios = this.userHorarios;
        aux.dias = this.userDias;
        /*
        if(aux.horarios=="Turno Mañana"){
        // aux.horarios.pull();
          aux.horarios.push(mañana);
        }
        else{
          aux.horarios.push(tarde);
        }*/
        

        console.log(aux);

        this.firestore.modificarUsuarios(aux, this.usuario.id);
        
        this.toaster.mostrarToastSuccess('Se asignaros los horarios', '!!!');
        this.userHorarios = [];
        this.userDias = [];
  
      }else{
        this.toaster.mostrarToastFail('error', 'Se debe seleccionar un horario!!');
      }
    }
  

   



  ngOnInit(): void {

    this.usuarios.subscribe((usuarios : any) => {

      for(let item of usuarios){
        if(item.dni == this.auth.logged.dni){
          this.usuario = item;
          break;
        }
      }
    });

  }

}
