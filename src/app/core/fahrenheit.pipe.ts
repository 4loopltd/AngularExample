import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fahrenheit'
})
export class FahrenheitPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    // Celsius to Fahrenheit conversion
    return ((value * (9 / 5)) + 32).toFixed(1);
  }

}
