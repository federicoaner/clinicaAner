import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edad'
})
export class EdadPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {

    let retorno;

    if( value > 60 ){

      retorno= value + " ,entrando a la tercera edad";
    }

   else if ( value > 20 && value < 41 ){

      retorno= value + " ,todavia es joven";
    } 

    else if ( value > 42 && value < 59 ){

      retorno= value + " ,ojo hay que empezar a cuidarse";
    }  

    else{
      retorno=value;
    }

    
    return retorno;
  }

}
