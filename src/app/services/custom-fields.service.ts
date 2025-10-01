import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface CustomFieldsResult {
    accounts: { id: string; description: string }[];
    categories: { id: string; name: string }[];
    responsibles: { id: string; name: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class CustomFieldsService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  private headers(groupId: string) {
    return {
      headers: new HttpHeaders({
        'X-Group-Id': groupId
      })
    };
  }

  getFields(groupId: string): Observable<CustomFieldsResult> {
    return this.http.get<CustomFieldsResult>(
      `${this.apiUrl}/custom-fields`,
      this.headers(groupId)
    );
  }

  createField(groupId: string, type: string, data: { id: string, name: string }) {
    return this.http.post(`${this.apiUrl}/custom-fields/${type}`, data, this.headers(groupId));
  }

  deleteField(groupId: string, type: string, id: string) {
    return this.http.delete(`${this.apiUrl}/custom-fields/${type}/${id}`, {
      headers: {
        'X-Group-Id': groupId
      }
    });
  }
  
}
