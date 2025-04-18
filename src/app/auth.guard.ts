import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const _authS = inject(AuthService);
  const _router = inject(Router);
  const userType = _authS.decodeAccessToken()?.userType;
  if (_authS.isAuthenticated()) {
    if (userType === 'admin') {
      return true;
    } else {
      _router.navigate(['/home']);
      return false;
    }
  } else {
    _router.navigate(['/login']);
    return false;
  }
};
