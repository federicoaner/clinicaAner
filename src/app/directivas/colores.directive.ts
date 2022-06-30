import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector: '[appColores]'
})
export class ColoresDirective {

  colors = [ 'blue', 'white','black'];

  constructor(el: ElementRef) {
    this.changeColor(el);
 }

 changeColor(el: ElementRef) {
  setInterval(() => {
   el.nativeElement.style.color = this.colors[Math.floor(Math.random() * this.colors.length)];
  }, 1000);
}

}
