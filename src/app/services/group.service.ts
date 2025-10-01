import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getMyGroups(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/me/groups`);
  }

  createGroup(name: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/groups`, { name });
  }

  inviteUser(groupId: string, userId: string) {
    return this.http.post(`${this.apiUrl}/groups/${groupId}/invite`, {
      user_id: userId
    });
  }

  findUserByEmail(email: string) {
    return this.http.get<{ user_id: string }>(`${this.apiUrl}/users?email=${email}`);
  }  

  setDefaultGroup(groupId: string) {
    return this.http.post(`${this.apiUrl}/me/default-group`, { group_id: groupId });
  }

}
