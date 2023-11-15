import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  // Se recupera el elemento link del DOM que tiene el atributo id="theme"
  private linkTheme = document.querySelector('#theme');

  constructor() {
    this.loadTheme();
  }

  public loadTheme(): void {
    // carga el tema del localStorage si existe
    // si no existe carga el tema por defecto
    const url =
      localStorage.getItem('theme') ?? './assets/css/colors/default.css';

    // Asignar el valor de la variable url al atributo href del elemento link
    this.linkTheme!.setAttribute('href', url);
  }

  public changeTheme(theme: string): void {
    // Recuperar el elemento link del DOM que tiene el atributo id="theme"

    if (this.linkTheme) {
      // Cambiar el atributo href del elemento link
      const url = `./assets/css/colors/${theme}.css`;
      // Asignar el valor de la variable url al atributo href del elemento link
      this.linkTheme.setAttribute('href', url);

      // Guardar el tema en el localStorage
      localStorage.setItem('theme', url);
    }

    // Se llama a la función que verifica el tema actual
    this.checkCurrentTheme();
  }

  public checkCurrentTheme(): void {
    // Se recupera todos los elementos que tienen la clase .selector
    const links: NodeListOf<Element> = document.querySelectorAll('.selector');

    links.forEach((element) => {
      // Remover la clase working de todos los elementos
      element.classList.remove('working');
      // Obtener el valor del atributo data-theme
      const btnTheme = element.getAttribute('data-theme');
      // Obtener la url del tema actual
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      // Obtener la url del tema actual
      const currentTheme = this.linkTheme!.getAttribute('href');

      // Comparar si el tema actual es igual al tema del botón
      if (btnThemeUrl === currentTheme) {
        element.classList.add('working');
      }
    });
  }
}
