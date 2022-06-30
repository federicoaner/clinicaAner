import { Directive,ElementRef,HostListener } from '@angular/core';
import { color, Color } from 'highcharts';

@Directive({
  selector: '[appDirectiva1]'
})
export class Directiva1Directive {

  constructor(private element: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter(){
    this.cambiarColor();
  } 

  @HostListener('mouseleave') onMouseLeave(){
    this.element.nativeElement.style['border-color'] = 'blue';
  } 

  cambiarColor(){
    this.element.nativeElement.style['border-color']='red' ;
  }

}


