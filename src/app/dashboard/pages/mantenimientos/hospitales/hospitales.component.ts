import Swal from 'sweetalert2';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';

import { Hospital } from 'src/app/models/hospital.interface';
import { Coleccion } from '../../../../models/interfaces/coleccion.enum';

import { HospitalesService } from 'src/app/services/hospitales.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit, OnDestroy {
  private hospitalesService = inject(HospitalesService);
  private modalImagenService = inject(ModalImagenService);
  private searchService = inject(SearchService);

  public cargando: boolean = false;
  public coleccion: Coleccion = Coleccion.hospitales;

  public totalHospitales: number = 0;
  public hospitales: Hospital[] = []

  public $img!: Subscription;

  ngOnInit(): void {
    this.cargarHospitales();

    this.$img = this.modalImagenService.nuevaImagen
      .subscribe({
        next: (img: any) => this.cargarHospitales(),
        error: (err: any) => console.log(err)
      })
  }

  ngOnDestroy(): void {
    this.$img.unsubscribe();
  }

  public cargarHospitales() {
    this.cargando = true;

    this.hospitalesService.obtenerHospitales()
      .subscribe({
        next: (resp: any) => {
          this.cargando = false;
          this.hospitales = resp.hospitales;
          this.totalHospitales = resp.total;
        },
        error: (err: any) => {
          this.cargando = false;
          console.log(err);
        }
      })
  }

  public guardarCambios(hospital: Hospital) {
    this.hospitalesService.actualizarHospital(hospital._id, hospital.nombre)
      .subscribe({
        next: (resp) => {
          Swal.fire('Actualizado', hospital.nombre, 'success');
        },
        error: (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');
        }
      })
  }

  public eliminarHospital(hospital: Hospital) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este hospital?',
      text: `Estás a punto de eliminar a ${hospital.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '!Sí, eliminar!',

    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalesService.borrarHospital(hospital._id)
          .subscribe({
            next: (resp) => {
              Swal.fire('Eliminado', hospital.nombre, 'success');
              this.cargarHospitales();
            },
            error: (err) => {
              console.log(err);
              Swal.fire('Error', err.error.msg, 'error');
            }
          })
      }
    });
  }

  public async crearHospital() {
    const { value } = await Swal.fire<string>({
      title: "Crear hospital",
      input: "text",
      inputLabel: "Ingrese el nombre del hospital",
      inputPlaceholder: "Nombre del hospital",
      showCancelButton: true,
    });

    if (!value) return;
    if (value.trim().length === 0) return;

    this.hospitalesService.crearHospital(value)
      .subscribe({
        next: (resp) => {
          Swal.fire('Creado', value, 'success');
          this.hospitales.push(resp.hospital)
        },
        error: (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');
        }
      })
  }

  public abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal(Coleccion.hospitales, hospital._id, hospital.img);
  }

  public buscarHospital(termino: string) {
    if (termino.trim().length === 0) {
      this.cargarHospitales();
      return;
    }

    this.searchService.buscar(Coleccion.hospitales, termino)
      .subscribe({
        next: (resp) => {
          this.hospitales = resp.results as Hospital[];
          this.totalHospitales = resp.total;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }
}
