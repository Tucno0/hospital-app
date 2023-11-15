import { EventEmitter, Injectable } from '@angular/core';
import { Coleccion } from '../models/interfaces/coleccion.enum';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
  private baseUrl: string = environment.base_url;

  private _esModalOculto: boolean = true;
  public coleccion!: Coleccion;
  public id!: string;
  public img!: string;

  // EventEmitter es un objeto de JS que nos permite emitir eventos de cualquier tipo
  // En este caso estamos emitiendo un string que es la nueva imagen cuando se sube una imagen y se actualiza
  public nuevaImagen: EventEmitter<string> = new EventEmitter();

  constructor() { }

  get esModalOculto(): boolean {
    return this._esModalOculto;
  }

  public abrirModal( coleccion: Coleccion, id: string, img: string = 'no-image'): void {
    this._esModalOculto = false;
    this.coleccion = coleccion;
    this.id = id;

    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${this.baseUrl}/uploads/${coleccion}/${img}`;
    }
  }

  public cerrarModal(): void {
    this._esModalOculto = true;
  }
}
