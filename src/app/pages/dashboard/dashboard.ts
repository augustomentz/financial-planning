import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import { Button } from 'primeng/button';
import { EventsComponent } from '../../components/events/events';
import type { Event as EventsEvent } from '../../components/events/events';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [DatePicker, Button, EventsComponent],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  date: Date[] | undefined;

  dashboard = inject(DashboardService);
  events = signal<EventsEvent[]>([]);

  ngOnInit() {
    this.dashboard.events().subscribe((events: EventsEvent[]) => {
      console.log(events);
      this.events.set(events)
    });
  }
}
