import Swal from 'sweetalert2';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';

import { Coleccion } from 'src/app/models/interfaces/coleccion.enum';
import { Usuario } from 'src/app/models/usuario.model';
import { Role } from 'src/app/models/role.interface';

import { UsuariosService } from 'src/app/services/usuarios.service';
import { SearchService } from '../../../../services/search.service';
import { RolesService } from '../../../../services/roles.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {
  private usuariosService = inject(UsuariosService);
  private searchService = inject(SearchService);
  private rolesService = inject(RolesService);
  private modalImagenService = inject(ModalImagenService);

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public desde: number = 0;
  public paginaActual: number = 1;
  public totalPaginas: number = 0;
  public cargando: boolean = true;

  public roles: Role[] = [];

  // Para poder desuscribirnos del observable cuando el componente se destruya
  public $img!: Subscription;

  ngOnInit(): void {
    this.cargarUsuarios();
    this.obtenerRoles();

    this.$img = this.modalImagenService.nuevaImagen
      .subscribe({
        next: (img: any) => this.cargarUsuarios(),
        error: (err: any) => console.log(err)
      })
  }

  ngOnDestroy(): void {
    this.$img.unsubscribe();
  }

  public cargarUsuarios() {
    this.cargando = true;

    this.usuariosService.cargarUsuarios(this.desde)
    .subscribe( ({ total, usuarios}) => {
      this.totalUsuarios = total;

      if(usuarios.length !== 0) {
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
      }
      // this.usuarios = usuarios;

      this.totalPaginas = this.totalUsuarios % 5 === 0
                        ? this.totalUsuarios / 5
                        : Math.floor(this.totalUsuarios / 5) + 1;
      this.cargando = false;
    });
  }

  public cambiarPagina( valor: number) {
    this.desde += valor;
    this.paginaActual += valor/5;

    if (this.desde < 0) this.desde = 0;
    if (this.desde >= this.totalUsuarios) this.desde -= valor;
    if (this.paginaActual < 1) this.paginaActual = 1;
    if (this.paginaActual > this.totalPaginas) this.paginaActual -= valor/5;

    this.cargarUsuarios();
  }

  public buscar(termino: string) {
    if (termino.trim().length === 0) {
      this.usuarios = this.usuariosTemp;
      return;
    };

    this.searchService.buscar(Coleccion.usuarios, termino)
      .subscribe({
        next: (resp) => {
          this.usuarios = resp.results as Usuario[];
          this.totalUsuarios = resp.total;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  public eliminarUsuario(usuario: Usuario) {
    if (usuario.uid === this.usuariosService.uid) {
      Swal.fire({
        title: 'Error',
        text: 'No puedes eliminar tu propio usuario',
        icon: 'error',
      });
      return;
    }

    Swal.fire({
      title: '¿Estás seguro de eliminar este usuario?',
      text: `Estás a punto de eliminar a ${usuario.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '!Sí, eliminar!',

    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.eliminarUsuario(usuario)
          .subscribe({
            next: (resp) => {
              Swal.fire({
                title: 'Usuario eliminado',
                text: `El usuario ${usuario.nombre} ha sido eliminado`,
                icon: 'success',
              });

              this.cargarUsuarios();
            },
            error: (err) => {
              console.log(err);
            }
          })
      }
    });
  }

  public obtenerRoles() {
    this.rolesService.obtenerRoles()
      .subscribe({
        next: (resp) => {
          this.roles = resp.roles;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  public cambiarRol(usuario: Usuario) {
    this.usuariosService.guardarUsuario(usuario)
      .subscribe({
        next: (resp) => {
          Swal.fire({
            title: 'Rol cambiado',
            text: `El rol de ${usuario.nombre} ha sido cambiado`,
            icon: 'success',
          });
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            title: 'Error',
            text: `No se pudo cambiar el rol de ${usuario.nombre}`,
            icon: 'error',
          });
        }
      })
  }

  public abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal(Coleccion.usuarios, usuario.uid || '', usuario.img);
  }

}
