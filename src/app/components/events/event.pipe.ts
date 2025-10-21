import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'event',
  standalone: true,
})
export class EventPipe implements PipeTransform {
  transform(value: any): any {
    switch (value) {
      case 'day':
        return 'Hoje';
      case 'week':
        return 'Esta semana';
      case 'month':
        return 'Este mês';
      case 'year':
        return 'Este ano';
    }
  }
}
