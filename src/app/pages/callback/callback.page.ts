import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-callback',
  template: `<ion-content class="ion-padding">Carregando...</ion-content>`,
  standalone: false,
})
export class CallbackPage implements OnInit { 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    const code = this.route.snapshot.queryParamMap.get('code');

    if (code) {
      try {
        await this.authService.handleAuthCallback(code);
        this.router.navigateByUrl('/tabs/home'); // ou outra página
      } catch (error) {
        console.error('Erro no login:', error);
      }
    }
  }
}
