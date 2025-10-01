import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private headers() {
    const groupId = localStorage.getItem('group_id') || '';
    return {
      headers: new HttpHeaders({
        'X-Group-Id': groupId
      })
    };
  }

  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/transactions`, this.headers());
  }

  createTransaction(data: any) {
    return this.http.post(`${this.apiUrl}/transactions`, data, this.headers());
  }

  updateTransaction(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/transactions/${id}`, data, this.headers());
  }

  deleteTransaction(id: string) {
    return this.http.delete(`${this.apiUrl}/transactions/${id}`, this.headers());
  }
}
