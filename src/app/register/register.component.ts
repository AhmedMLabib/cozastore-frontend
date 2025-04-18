import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isExist = false;
  constructor(private _authService: AuthService, private _router: Router) {}
  submitRegister(form: NgForm) {
    let formValue = form.value;
    delete formValue.rePassword;
    formValue.userType = 'user';
    this._authService.register(formValue).subscribe({
      next: () => {
        this._router.navigate(['/login']);
      },
      error: () => (this.isExist = true),
    });
  }
}
