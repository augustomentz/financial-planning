import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environments";
import { map } from "rxjs";
import type { Event } from "../../core/event";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  http = inject(HttpClient);

  events() {
    return this.http.get<Event[]>(`${environment.apiUrl}/events`)
      .pipe(map((response: any) => response.events));
  }
}
