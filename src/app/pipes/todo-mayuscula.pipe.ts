import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todoMayuscula'
})
export class TodoMayusculaPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.toUpperCase();
  }

}
