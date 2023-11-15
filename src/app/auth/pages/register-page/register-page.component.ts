import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

import { FormValidatorsService } from '../../../shared/services/form-validators.service';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private formValidatorsService = inject(FormValidatorsService);
  private usuariosService = inject(UsuariosService);
  private router = inject(Router);

  public registerForm: FormGroup = this.fb.group({
    nombre: [
      'Raul Contreras',
      [
        Validators.required,
        Validators.pattern( this.formValidatorsService.firstNameAndLastnamePattern ),
      ],
    ],
    email: [
      'raul@gmail.com',
      [
        Validators.required,
        Validators.pattern(this.formValidatorsService.emailPattern),
      ],
    ],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
    password2: ['123456', [Validators.required]],
    terminos: [false, [Validators.requiredTrue]],
  },
  {
    validators: [
      this.formValidatorsService.isFieldOneEqualToFieldTwo('password', 'password2')
    ]
  });

  public isInvalidField(field: string): boolean | null {
    return this.formValidatorsService.isInvalidField(this.registerForm, field);
  }

  public getFieldError(field: string): string | null {
    return this.formValidatorsService.getFieldError(this.registerForm, field);
  }

  public onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.usuariosService.crearUsuario(this.registerForm.value)
      .subscribe({
        next: (resp) => {
          Swal.fire('Exito', 'Usuario creado correctamente', 'success');
          this.router.navigateByUrl('/dashboard');
        },
        error: (err) => {
          Swal.fire('Error', err.error.errors[0].msg, 'error');
        },
      })
  }
}
