import { environment } from "src/environments/environments";

export interface UsuarioSimple {
  _id: string;
  nombre: string;
  img: string;
}

const base_url = environment.base_url;
export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public rol?: 'ADMIN_ROLE' | 'USER_ROLE',
    public google?: boolean,
    public uid?: string
  ) { }

  get imageUrl() {
    // si la imagen viene de google, la devolvemos tal cual
    if (this.img?.includes('https')) return this.img;
    // si no, la devolvemos de la carpeta uploads
    // si no hay imagen, devolvemos una imagen por defecto
    if (!this.img) {
      return `${base_url}/uploads/usuarios/no-image`;
    }
    // si hay imagen, la devolvemos
    return `${base_url}/uploads/usuarios/${this.img}`;
  }
}
