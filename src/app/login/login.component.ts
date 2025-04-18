import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  error = false;
  constructor(private _authService: AuthService, private _router: Router) {}

  submitLogin(form: NgForm) {
    this._authService.login(form.value).subscribe({
      next: () => {
        const dAToken = this._authService.decodeAccessToken();
        console.log(dAToken);
        if (dAToken.userType === 'admin') {
          this._router.navigate(['/dashboard/products']);
        } else {
          this._router.navigate(['/home']);
        }
      },
      error: () => {
        this.error = true;
        console.log('error');
      },
    });
  }
}
