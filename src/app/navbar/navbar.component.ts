import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(private _authS: AuthService, private _router: Router) {}
  isLogin = false;
  ngOnInit(): void {
    this._authS.getAccessToken().subscribe((data) => {
      if (data) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }
  logout() {
    this._authS.logout();
    this._router.navigate(['/login']);
  }
}
