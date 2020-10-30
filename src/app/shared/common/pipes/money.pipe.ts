import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    if(value === 0) return '0.00';
    return value ? `${(value/100).toFixed(2)}` : '•••'
  }

}
