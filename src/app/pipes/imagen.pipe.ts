import { Pipe, PipeTransform } from '@angular/core';
import { Coleccion } from '../models/interfaces/coleccion.enum';
import { environment } from 'src/environments/environments';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  private baseUrl: string = environment.base_url;

  transform(img: string | undefined, coleccion: Coleccion): string {
    if (!img)  return `${this.baseUrl}/uploads/${coleccion}/no-image`;
    if (img.includes('https')) return img;

    return `${this.baseUrl}/uploads/${coleccion}/${img}`;
  }

}
