import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { EventPipe } from './event.pipe';
import { NgClass } from '@angular/common';

type Event = {
  text: string;
  day: string;
  entry: boolean
}

@Component({
  selector: 'app-events',
  imports: [EventPipe, NgClass],
  standalone: true,
  templateUrl: './events.html',
  styleUrls: ['./events.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EventPipe],
})
export class EventsComponent {
  readonly events = signal<{
    period: 'day' | 'week' | 'month' | 'year';
    events: Event[];
  }[]>([
    {
      period: 'day',
      events: [
        { text: 'Pagar cartão de crédito', day: '01', entry: false },
        { text: 'Recebimento de dividendos', day: '07', entry: true },
        { text: 'Vencimento da academia', day: '07', entry: false },
      ]
    },
    {
      period: 'month',
      events: [
        { text: 'Parcela do item X', day: '14', entry: false },
        { text: 'Recebimento de férias', day: '20', entry: true },
      ]
    }
  ]);
}
