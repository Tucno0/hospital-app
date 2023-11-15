import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  public usuario: Usuario = this.authService.usuario;

  logout() {
    this.authService.logout();
  }

  public buscar(termino: string) {
    if (!termino || termino.trim().length === 0) {
      return;
    }
    this.router.navigateByUrl(`/dashboard/busqueda/${termino}`);
  }
}
