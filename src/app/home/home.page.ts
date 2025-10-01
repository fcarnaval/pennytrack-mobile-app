import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

    userName: string | null = null;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.userName = this.userService.getUserName();
    }

}
