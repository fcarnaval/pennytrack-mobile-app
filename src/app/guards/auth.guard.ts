import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    return this.checkAuthentication();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkAuthentication();
  }

  private checkAuthentication(): boolean | UrlTree {
    const idToken = localStorage.getItem('id_token');

    if (!idToken) {
      return this.router.parseUrl('/login');
    }

    const tokenPayload = this.decodeToken(idToken);

    if (!tokenPayload) {
      return this.router.parseUrl('/login');
    }

    const expirationTime = tokenPayload.exp * 1000;
    const currentTime = Date.now();

    if (currentTime > expirationTime) {
      localStorage.clear();
      return this.router.parseUrl('/login');
    }

    return true;
  }

  private decodeToken(token: string): any | null {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
