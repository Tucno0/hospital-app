import { Component, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Usuario } from '../../../models/usuario.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Menu } from 'src/app/auth/interfaces/login-response.interface';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  public sidebarService = inject(SidebarService);
  private authService = inject(AuthService);

  public menuItems: Menu[] = [];
  public usuario: Usuario = this.authService.usuario;

  constructor() {
    // this.menuItems = this.sidebarService.menu;
  }
}
