  import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const privateGuard: CanActivateFn = (route, state) => {
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
