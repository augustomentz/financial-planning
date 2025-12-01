import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import multiMonthPlugin from '@fullcalendar/multimonth';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarService } from './calendar.service';

import type { Event } from '../../core/event';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionType } from '../transactions/transactions';
import { Select } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule, ButtonModule, DialogModule, ReactiveFormsModule, Select, FloatLabelModule, InputText, DatePicker],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Calendar implements OnInit {
  calendarService = inject(CalendarService);
  formBuilder = inject(FormBuilder);
  visible = signal(false);
  form = signal<FormGroup | any>(null);

  datetime12h: Date[] | undefined;

  datetime24h: Date[] | undefined;

  time: Date[] | undefined;

  transactionTypes = signal<{ label: string, value: string }[]>([
    { label: 'Crédito', value: TransactionType.CREDIT },
    { label: 'Débito', value: TransactionType.DEBIT },
  ]);

  calendarOptions: WritableSignal<CalendarOptions> = signal({
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin, dayGridPlugin, multiMonthPlugin, interactionPlugin],
    locale: 'pt-br',
    headerToolbar: {
      left: '',
      right: '',
      center: 'prev,today,next,timeGridWeek,timeGridDay,dayGridMonth',
    },
    buttonText: {
      today: 'Hoje',
      month: 'Mês',
      week: 'Semana',
      day: 'Dia',
    },
    slotMinTime: '07:00:00',
    slotMaxTime: '23:00:00',
    slotDuration: '01:00:00',
    allDaySlot: false,
    height: '100%',
    nowIndicator: true,
    dayMaxEvents: 3,
    moreLinkText: 'mais',
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      omitZeroMinute: true,

      meridiem: 'short',
      hour12: true
    },
    dayHeaderFormat: {
      weekday: 'long',
      day: 'numeric'
    },
    dayHeaderContent: (args) => {
      const view = args.view.type;
      const weekday = args.text.split(' ')[0].replace(',', '');

      if (view === 'timeGridWeek' || view === 'timeGridDay') {
        const day = args.date.getDate();
        return {
          html: `<div class="custom-day-header"><div class="day-name">${weekday}</div><div class="day-number">${day}</div></div>`
        };
      }

      // Simple day name for month/year views
      return { html: `<div class="day-name">${weekday}</div>` };
    },
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: 'short',
      hour12: true
    },
    events: []
  })

  ngOnInit() {
    this.form.set(this.formBuilder.group({
      description: ['', [Validators.required]],
      type: ['', [Validators.required]],
      competency: ['', [Validators.required]],
    }));

    this.updateCalendar();
  }

  showDialog() {
    this.visible.set(true);
  }

  add() {
    const { description, type, competency } = this.form().value;

    this.calendarService.addEvent({
      description,
      type: type.value as TransactionType,
      competency
    }).subscribe({
      next: () => {
        this.updateCalendar();

        this.visible.set(false);
        this.form().reset();
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  updateCalendar() {
    this.calendarService.events().subscribe((events: Event[]) => {
      const eventsSource = events.map((event): any => ({
        title: event.description,
        end: event.competency.replace('Z', ''),
        start: event.competency.replace('Z', ''),
        classNames: event.type === 'DEBIT' ? 'event-debit' : 'event-credit',
        backgroundColor: event.type === 'DEBIT' ? '#fecaca' : '#bbf7d0',
        borderColor: event.type === 'DEBIT' ? '#ef4444' : '#22c55e',
        textColor: event.type === 'DEBIT' ? '#991b1b' : '#0F2A1D'
      }));

      this.calendarOptions.update(prev => ({
        ...prev,
        events: eventsSource
      }));
    })
  }
}
