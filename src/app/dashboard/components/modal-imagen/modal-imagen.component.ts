import { Component, inject } from '@angular/core';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { FilesService } from 'src/app/services/files.service';
import { Coleccion } from 'src/app/models/interfaces/coleccion.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'dashboard-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent {
  public modalImagenService = inject(ModalImagenService);
  public filesService = inject(FilesService);

  public esModalOculto: boolean = false;
  public imagenSubir!: File;
  public imagenTemporal: any = null;

  public cerrarModal(): void {
    this.modalImagenService.cerrarModal();
    this.imagenTemporal = null;
  }

  public cambiarImagen( event: Event ): string | void {
    const file: File | undefined = (event.target as HTMLInputElement).files?.[0];

    if (!file) {
      return this.imagenTemporal = '';
    };

    //* Creando un preview de la imagen
    // FileReader es un objeto de JS que nos permite leer archivos de forma asíncrona
    const reader = new FileReader();
    // readAsDataURL es un método de FileReader que nos permite leer el archivo como una URL
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imagenTemporal = reader.result as string;
    }

    this.imagenSubir = file;
    this.imagenTemporal = '';
  }

  public subirImagen(): void {
    const id = this.modalImagenService.id;
    const coleccion = this.modalImagenService.coleccion;

    this.filesService.actualizarFoto(this.imagenSubir, coleccion, id)
      .then((img) => {
        Swal.fire('Imagen actualizada', 'La imagen del perfil se ha actualizado correctamente', 'success');
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }
}
