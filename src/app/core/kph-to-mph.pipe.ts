import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kphToMph'
})
export class KphToMphPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    // KPH to MPH conversion
    return (value * 0.621371).toFixed(1);
  }

}
