import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'daySuffix'
})
export class DaySuffixPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const day = parseInt(moment(value).format('DD'), 10);
    const relevantDigits = (day < 30) ? day % 20 : day % 30;
    const suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
    return moment(value).format('ddd D') + suffix;
  }

}
