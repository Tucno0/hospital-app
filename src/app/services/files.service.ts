import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { UploadImageResponse } from '../models/interfaces/upload-image-response.interface';
import { Coleccion } from '../models/interfaces/coleccion.enum';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private baseUrl = environment.base_url;
  constructor() { }

  public async actualizarFoto( archivo: File, tipo: Coleccion, id: string) {
    try {
      const url = `${this.baseUrl}/uploads/${tipo}/${id}`;
      // FormData es un objeto de JS que nos permite crear un formulario en el que podemos agregar campos de tipo archivo y texto
      const formData = new FormData();
      formData.append('archivo', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: formData,
      });

      const data: UploadImageResponse = await resp.json();

      return data.modelo.img || '';

    } catch (error) {
      console.log(error);
      return '';
    }
  }
}
