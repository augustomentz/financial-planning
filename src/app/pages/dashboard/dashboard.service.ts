import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environments";
import { map } from "rxjs";
import type { Event as EventsEvent } from "../../components/events/events";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  events() {
    return this.http.get<EventsEvent[]>(`${environment.apiUrl}/events`)
      .pipe(map((response: any) => response.events));
  }
}
