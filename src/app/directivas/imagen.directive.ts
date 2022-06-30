import { Directive,ElementRef,HostListener } from '@angular/core';
import { environment } from '../../environments/environment';

@Directive({
  selector: '[appImagen]'
})
export class ImagenDirective {

  element:any;
  constructor(private el: ElementRef) {
    
   }

  @HostListener('error')
  onError(): void {
    this.el.nativeElement.src = 'assets/especialidadDefault.png';
  }

  

}
