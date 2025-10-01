import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';
import { GroupService } from './group.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private redirectUri = `${window.location.origin}/callback`;
  private cognitoDomain = `https://${environment.cognito.domain}`;
  private clientId = environment.cognito.clientId;
  private responseType = 'code';
  private scope = 'openid phone email profile';
  private codeVerifier: string = '';

  constructor(private groupService: GroupService) {}

  private generateRandomString(length: number): string {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let text = '';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  private sha256(plain: string): string {
    const hash = CryptoJS.SHA256(plain);
    return this.base64URLEncode(hash);
  }

  private base64URLEncode(wordArray: CryptoJS.lib.WordArray): string {
    return CryptoJS.enc.Base64.stringify(wordArray)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  login() {
    this.codeVerifier = this.generateRandomString(128);
    const codeChallenge = this.sha256(this.codeVerifier);

    localStorage.setItem('pkce_code_verifier', this.codeVerifier);

    const loginUrl = `${this.cognitoDomain}/oauth2/authorize?` +
      `response_type=${this.responseType}` +
      `&client_id=${this.clientId}` +
      `&redirect_uri=${encodeURIComponent(this.redirectUri)}` +
      `&scope=${encodeURIComponent(this.scope)}` +
      `&code_challenge_method=S256` +
      `&code_challenge=${codeChallenge}`;

    window.location.href = loginUrl;
  }

  async handleAuthCallback(code: string) {
    const storedVerifier = localStorage.getItem('pkce_code_verifier');

    if (!storedVerifier) {
      throw new Error('PKCE code verifier not found');
    }

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: this.clientId,
      code: code,
      redirect_uri: this.redirectUri,
      code_verifier: storedVerifier
    });

    const response = await fetch(`${this.cognitoDomain}/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body.toString()
    });

    const tokens = await response.json();

    if (tokens.id_token) {
      localStorage.setItem('id_token', tokens.id_token);
      localStorage.setItem('access_token', tokens.access_token);
      localStorage.setItem('refresh_token', tokens.refresh_token);
      this.getDefaultGroup();

    } else {
      throw new Error('Tokens not received');
    }
  }

  logout() {
    localStorage.clear();
    const logoutUrl = `${this.cognitoDomain}/logout?` +
      `client_id=${this.clientId}` +
      `&logout_uri=${encodeURIComponent(this.redirectUri)}`;
    window.location.href = logoutUrl;
  }

  getDefaultGroup() {
    this.groupService.getMyGroups().subscribe(grupos => {
        const grupoPadrao = grupos.find(g => g.default) || grupos[0];
        localStorage.setItem('group_id', grupoPadrao.group_id);
    });
  }
}
