import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  sub: string;
  name?: string;
  given_name?: string;
  email?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getIdToken(): string | null {
    return localStorage.getItem('id_token');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getUserInfo(): TokenPayload | null {
    const token = this.getIdToken();
    if (!token) return null;

    try {
      return jwtDecode<TokenPayload>(token);
    } catch (e) {
      console.error('Erro ao decodificar token:', e);
      return null;
    }
  }

  getUserName(): string | null {
    const user = this.getUserInfo();
    let name = user?.name?.split(" ")[0] || null;
    return name;
  }

  getUserId(): string | null {
    const user = this.getUserInfo();
    return user?.sub || null;
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/login'; // ou this.router.navigateByUrl()
  }
}
