import { Injectable } from '@angular/core';

interface Menu {
  title: string;
  icon: string;
  submenu: MenuItem[];
}

interface MenuItem {
  title: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu: Menu[] = [];

  constructor() {
  }

  public cargarMenu(): void {
    this.menu = JSON.parse(localStorage.getItem('menu') || '[]');
  }
}
