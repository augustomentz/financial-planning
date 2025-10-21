import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'transaction',
  standalone: true,
})
export class TransactionPipe implements PipeTransform {
  transform(value: any): any {
    switch (value) {
      case 'entrada':
        return 'Entrada';
      case 'saida':
        return 'Saída';
      default:
        return value;
    }
  }
}
