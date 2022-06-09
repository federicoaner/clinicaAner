import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr : ToastrService) { }

  public mostrarToast(titulo : string, mensaje : string){

    this.toastr.error(mensaje, titulo);

  }


  public mostrarToastSuccess(titulo : string, mensaje : string){

    this.toastr.success(mensaje, titulo);

  }

  public mostrarToastFail(titulo : string, mensaje : string){

    this.toastr.error(mensaje, titulo);

  }

  public mostrarToastInfo(titulo : string, mensaje : string){

    this.toastr.info(mensaje, titulo);

  }




}
