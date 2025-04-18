import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'cozaStore';
  constructor(private _router: Router) {}
  get isDashboard(): boolean {
    return this._router.url.startsWith('/dashboard');
  }
}
