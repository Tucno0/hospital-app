import Swal from 'sweetalert2';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../../auth/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FilesService } from '../../../services/files.service';

import { Usuario } from 'src/app/models/usuario.model';
import { UpdateUserFormData } from 'src/app/models/interfaces/update-user-form-data.interface';
import { Coleccion } from '../../../models/interfaces/coleccion.enum';

@Component({
  selector: 'app-perfil-page',
  templateUrl: './perfil-page.component.html',
  styleUrls: ['./perfil-page.component.css'],
})
export class PerfilPageComponent {
  private fb = inject(FormBuilder);

  private authService = inject(AuthService);
  private usuarioService = inject(UsuariosService);
  private filesService = inject(FilesService);

  public usuario: Usuario = this.authService.usuario;

  public imagenSubir!: File;
  public imagenTemporal: string = '';

  public perfilForm = this.fb.group({
    nombre: [
      this.usuario.nombre,
      [Validators.required],
    ],
    email: [
      // Si el usuario se ha registrado con Google, el campo email estará deshabilitado
      // { value: this.usuario.email, disabled: this.usuario.google },
      this.usuario.email,
      [Validators.required, Validators.email],
    ],
  });

  public actualizarPerfil() {
    if (this.perfilForm.invalid) {
      this.perfilForm.markAllAsTouched();
      return;
    }

    this.usuarioService.actualizarUsuario(this.perfilForm.value as UpdateUserFormData)
      .subscribe({
        next: (resp) => {
          const { nombre, email } = resp.usuario;
          this.usuario.nombre = nombre;
          this.usuario.email = email;

          Swal.fire('Perfil actualizado', 'Los datos del perfil se han actualizado correctamente', 'success');
        },
        error: (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');
        },
      })
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

  public actualizarImagen() {
    if (!this.usuario.uid) return;

    this.filesService.actualizarFoto(this.imagenSubir, Coleccion.usuarios, this.usuario.uid)
      .then((img) => {
        this.usuario.img = img;
        Swal.fire('Imagen actualizada', 'La imagen del perfil se ha actualizado correctamente', 'success');
      })
      .catch((err) => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }
}
