import Swal from 'sweetalert2';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { HospitalesService } from 'src/app/services/hospitales.service';
import { MedicosService } from '../../../services/medicos.service';

import { Coleccion } from '../../../models/interfaces/coleccion.enum';
import { Hospital } from 'src/app/models/hospital.interface';
import { Medico } from 'src/app/models/medico.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dashboard-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private hospitalesService = inject(HospitalesService);
  private medicosService = inject(MedicosService);

  public medicosColeccion = Coleccion.medicos;
  public coleccionHospital = Coleccion.hospitales;

  public hospitales: Hospital[] = [];
  public hospitalSeleccionado!: Hospital;
  public medicoSeleccionado!: Medico;

  public medicoForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    hospital: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.cargarHospitales();


    //* valueChanges es un observable que emite un valor cada vez que el valor del control cambia, nos permite escuchar cambios en el hospital seleccionado
    this.medicoForm.get('hospital')?.valueChanges
      .subscribe({
        next: (hospitalId) => {
          // Buscamos el hospital seleccionado en el arreglo de hospitales
          // find() regresa el primer elemento que cumpla con la condición
          this.hospitalSeleccionado = this.hospitales
          .find(hospital => hospital._id === hospitalId)!;
        }
      })

    if (this.router.url.includes('nuevo')) return;

    this.activatedRoute.params.subscribe({
      next: ({id}) => this.cargarMedico(id),
      error: (err) => console.log(err),
    })


  }

  public cargarMedico(id: string) {
    // Si el id es nuevo, entonces no cargamos ningún médico
    if( id === 'nuevo' ) return;

    // Si el id no es nuevo, entonces cargamos el médico
    this.medicosService.obtenerMedicoPorId(id)
      .subscribe({
        next: medico => {
          if (!medico) return this.router.navigateByUrl('/dashboard/medicos');

          this.medicoSeleccionado = medico;
          this.medicoForm.setValue({
            nombre: medico.nombre,
            hospital: medico.hospital!._id
          })
          return;
        },
        error: err => {
          this.router.navigateByUrl('/dashboard/medicos');
          console.log(err);
        }
      })
  }

  public guardarMedico() {
    if (this.medicoForm.invalid) {
      return;
    }

    const nombre = this.medicoForm.get('nombre')?.value;
    if (!nombre) {
      return;
    }

    const datos = {
      nombre,
      hospital: this.medicoForm.get('hospital')?.value || ''
    }

    // Si existe un médico seleccionado y no estamos en la ruta de nuevo, entonces actualizamos
    if (this.medicoSeleccionado && !this.router.url.includes('nuevo')) {
      const data = {
        ...datos,
        _id: this.medicoSeleccionado._id
      }
      this.medicosService.actualizarMedico(data)
        .subscribe({
          next: resp => {
            Swal.fire('Médico actualizado', resp.medico.nombre, 'success');
          },
          error: err => {
            console.log(err);
            Swal.fire('Error', err.error.msg, 'error');
          }
        })

      return;
    }

    // Si no existe un médico seleccionado, entonces creamos uno nuevo
    this.medicosService.crearMedico(datos)
      .subscribe({
        next: resp => {
          Swal.fire('Médico creado', resp.medico.nombre, 'success');
          this.medicoSeleccionado = resp.medico;

          // Redireccionamos al médico creado
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
        },
        error: err => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');
        }
      })
  }

  public cargarHospitales() {
    this.hospitalesService.obtenerHospitales()
      .subscribe({
        next: resp => {
          this.hospitales = resp.hospitales;
        },
        error: err => {
          console.log(err);
        }
      })
  }
}
