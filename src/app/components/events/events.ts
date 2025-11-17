import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { EventPipe } from './event.pipe';
import { DatePipe, JsonPipe, NgClass } from '@angular/common';
import { TransactionType } from '../../pages/transactions/transactions';

export type Event = {
  id: string;
  description: string;
  type: TransactionType,
  competency: string
  created_at: string;
}

@Component({
  selector: 'app-events',
  imports: [EventPipe, NgClass, DatePipe],
  standalone: true,
  templateUrl: './events.html',
  styleUrls: ['./events.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EventPipe],
})
export class EventsComponent {
  events = input.required<Event[]>();

  readonly eventsByPeriod = computed(() => {
    const date = new Date();
    const periods = ['day', 'week', 'year']

    return periods.map((period, index) => {
      return {
        period,
        events:
          this
            .events()
            .filter((event) => {
              if (period === 'day') {
                return event.competency.split('-')[0] === date.getDate().toString();
              } else if (period === 'week') {
                return this.isDateInCurrentWeek(new Date(event.competency));
              } else if (period === 'year') {
                return event.competency.split('-')[0] === date.getFullYear().toString();
              }

              return false;
            })
      }
    })
  })

  isDateInCurrentWeek(dateToCheck: Date) {
    const today = new Date();

    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));

    firstDayOfWeek.setHours(0, 0, 0, 0);

    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

    lastDayOfWeek.setHours(23, 59, 59, 999);

    return dateToCheck.getTime() >= firstDayOfWeek.getTime() && dateToCheck.getTime() <= lastDayOfWeek.getTime();
  }
}
