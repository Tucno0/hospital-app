import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Medico } from 'src/app/models/medico.interface';
import { MedicosService } from 'src/app/services/medicos.service';
import { Coleccion } from '../../../../models/interfaces/coleccion.enum';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { SearchService } from '../../../../services/search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit, OnDestroy{

  private medicosService = inject(MedicosService);
  private modalImagenService = inject(ModalImagenService);
  private searchService = inject(SearchService);

  public estaCargando: boolean = true;
  public coleccion: Coleccion = Coleccion.medicos;

  public medicos: Medico[] = [];
  public totalMedicos: number = 0;

  public $img!: Subscription;

  ngOnInit(): void {
    this.cargarMedicos();

    this.$img = this.modalImagenService.nuevaImagen
      .subscribe({
        next: (img: any) => this.cargarMedicos(),
        error: (err: any) => console.log(err)
      })
  }

  ngOnDestroy(): void {
    this.$img.unsubscribe();
  }

  public cargarMedicos() {
    this.estaCargando = true;

    this.medicosService.obtenerMedicos()
      .subscribe({
        next: resp => {
          this.medicos = resp.medicos;
          this.totalMedicos = resp.total;
          this.estaCargando = false;
        },
        error: err => {
          console.log(err);
          this.estaCargando = false;
        }
      })
  }

  public borrarMedico(medico: Medico) {
    if (!medico) return;

    Swal.fire({
      title: '¿Seguro que quieres eliminar este médico?',
      text: `Estás a punto de eliminar a ${medico.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '!Sí, eliminar!',

    }).then((result) => {
      if (result.isConfirmed) {
        this.medicosService.borrarMedico(medico._id)
          .subscribe({
            next: resp => {
              this.cargarMedicos();
              Swal.fire('Medico eliminado', `${medico.nombre} ha sido eliminado correctamente`, 'success');
            },
            error: err => console.log(err)
          })
      }
    })
  }

  public abrirModal(medico: Medico) {
    if (!medico) {
      console.error('Medico is undefined');
      return;
    }

    this.modalImagenService.abrirModal(Coleccion.medicos, medico._id, medico.img);
  }

  public buscarMedico(termino: string) {
    if (!termino) return this.cargarMedicos();
    if (termino.trim().length === 0) return this.cargarMedicos();

    this.searchService.buscar(Coleccion.medicos, termino)
      .subscribe({
        next: resp => {
          this.medicos = resp.results as Medico[];
          this.totalMedicos = resp.total;
        },
        error: err => console.log(err)
      })
  }
}
