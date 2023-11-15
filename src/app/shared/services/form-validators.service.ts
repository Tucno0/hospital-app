import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorsService {
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { }

  public isInvalidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public getFieldError(form: FormGroup, field: string): string | null {
    if (!form.controls[field]) return null;

    const errors = form.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return 'Este campo debe tener al menos 3 caracteres';
        case 'min':
          return 'El precio mínimo es de 0';
        case 'max':
          return 'El valor máximo es de 100';
        case 'pattern':
          return 'Debe ser en formato de nombre y apellido';
        default:
          return 'Error desconocido';
      }
    }

    return null;
  }

  public isFieldOneEqualToFieldTwo(fieldOne: string, fieldTwo: string) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(fieldOne)?.value;
      const fieldValue2 = formGroup.get(fieldTwo)?.value;

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(fieldTwo)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }
      formGroup.get(fieldTwo)?.setErrors(null);
      return null;
    }
  }

}
