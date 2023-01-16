import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRed]'
})
export class RedDirective {

  constructor(private elemento: ElementRef) {
    this.elemento.nativeElement.style.color = '#e9384a'
  }

}
