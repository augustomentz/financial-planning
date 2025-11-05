import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../environments/environments";
import { Transaction, TransactionsInfo } from "./transactions";
import { delay, map, of } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private http = inject(HttpClient);

  get() {
    return this.http.get<Transaction[]>(`${environment.apiUrl}/transactions`)
      .pipe(map((response: any) => response.transactions as Transaction[]))
  }

  add(transaction: Transaction) {
    return this.http.post<Transaction>(`${environment.apiUrl}/transactions`, transaction)
  }

  info() {
    return this.http.get<{ entry: number, withdrawal: number, total: number }>(`${environment.apiUrl}/transactionsInfo`)
      .pipe(map((response: any) => response.info as TransactionsInfo))
  }
}
