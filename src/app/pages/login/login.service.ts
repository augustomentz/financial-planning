import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environments";
import { map } from "rxjs";
import { User } from "../../core/user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  http = inject(HttpClient);

  login(email: string, password: string) {
    return this.http.post<User[]>(`${environment.apiUrl}/authenticate`, {
      email,
      password
    }).pipe(map((response: any) => response));
  }

  register(name: string, email: string, password: string) {
    return this.http.post<User[]>(`${environment.apiUrl}/register`, {
      name,
      email,
      password
    }).pipe(map((response: any) => response.events));
  }

  getUserInfo(id: string) {
    return this.http.get<User[]>(`${environment.apiUrl}/user?id=${id}`, {}).pipe(map((response: any) => response.user));
  }
}
