import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mayuscula'
})
export class MayusculaPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value ? value[0].toUpperCase() + value.slice(1) : null;
  }

}
