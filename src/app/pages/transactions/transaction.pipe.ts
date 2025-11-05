import { Pipe, PipeTransform } from "@angular/core";
import { TransactionType } from "./transactions";

@Pipe({
  name: 'transaction',
  standalone: true,
})
export class TransactionPipe implements PipeTransform {
  transform(value: any): any {
    switch (value) {
      case TransactionType.CREDIT:
        return 'Entrada';
      case TransactionType.DEBIT:
        return 'Saída';
      default:
        return value;
    }
  }
}
