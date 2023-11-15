import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

export const adminCanMatchGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.validarToken()
    .pipe(
      tap((isAuthenticaded) => {
        if (!isAuthenticaded) {
          router.navigateByUrl('/auth');
        }
      }
      )
    );
};
