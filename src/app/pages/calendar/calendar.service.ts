import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environments";
import { map } from "rxjs";
import type { Event as EventsEvent } from "../../components/events/events";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  http = inject(HttpClient);

  events() {
    return this.http.get<EventsEvent[]>(`${environment.apiUrl}/events`)
      .pipe(map((response: any) => response.events));
  }
}
