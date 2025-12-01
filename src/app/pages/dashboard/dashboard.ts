import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import { Button } from 'primeng/button';
import { PrimeTemplate } from 'primeng/api';
import { EventsComponent } from '../../components/events/events';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';
import { Event } from '../../core/event';
@Component({
  selector: 'app-dashboard',
  imports: [DatePicker, Button, EventsComponent, PrimeTemplate],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  date: Date[] | undefined;

  dashboard = inject(DashboardService);
  events = signal<Event[]>([]);
  router = inject(Router);

  // Map of dates with event types
  eventDates = computed(() => {
    const dateMap = new Map<string, 'DEBIT' | 'CREDIT'>();

    this.events().forEach(event => {
      const date = new Date(event.competency);
      const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      dateMap.set(dateKey, event.type);
    });

    return dateMap;
  });

  ngOnInit() {
    this.dashboard.events().subscribe((events: Event[]) => {
      this.events.set(events);
    });
  }

  navigateToCalendar() {
    this.router.navigate(['/calendar']);
  }

  // Check if a date has an event
  hasEvent(dateObj: any): 'DEBIT' | 'CREDIT' | null {
    // PrimeNG passes an object with year, month, day properties
    const year = dateObj.year;
    const month = dateObj.month;
    const day = dateObj.day;

    const dateKey = `${year}-${month}-${day}`;
    const result = this.eventDates().get(dateKey) || null;

    return result;
  }
}
