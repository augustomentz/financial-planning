import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import { Button } from 'primeng/button';
import { EventsComponent } from '../../components/events/events';

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
}
