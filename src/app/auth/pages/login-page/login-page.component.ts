import Swal from 'sweetalert2';

import { AfterViewInit, Component, ElementRef, NgZone, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FormValidatorsService } from 'src/app/shared/services/form-validators.service';
import { AuthService } from '../../services/auth.service';
import { environment } from 'src/environments/environments';

declare const google: any; // Para que no de error en el compilador de TypeScript

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements AfterViewInit {
  private router = inject(Router)
  private ngZone = inject(NgZone);
  private fb = inject(FormBuilder);

  private formValidatorsService = inject(FormValidatorsService);
  private authService = inject(AuthService);

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public loginForm: FormGroup = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [
        Validators.required,
        Validators.pattern(this.formValidatorsService.emailPattern),
      ]
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false],
  });

  ngAfterViewInit(): void {
    this.googleInit();
  }

  public googleInit() {
    google.accounts.id.initialize({
      client_id: environment.GOOGLE_CLIENT_ID,
      callback: (response: any) => this.handleCredentialResponse(response),
    });

    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,   // HTML element
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  public handleCredentialResponse(response: any) {
    // console.warn("Encoded JWT ID token: " + response.credential);
    this.authService.loginGoogle(response.credential)
      .subscribe({
        next: (resp) => {
          // console.log({login: resp});
          // Navegar al dashboard si el login es correcto
          this.ngZone.run(() => {
            this.router.navigateByUrl('/dashboard');
          });
        },
        error: (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      })
  }

  public isInvalidField(field: string): boolean | null {
    return this.formValidatorsService.isInvalidField(this.loginForm, field);
  }

  public onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.login(this.loginForm.value)
      .subscribe({
        next: (resp) => {
          if (this.loginForm.get('remember')?.value) {
            localStorage.setItem('email', this.loginForm.get('email')?.value);
          } else {
            localStorage.removeItem('email');
          }

          // console.log(resp);
          // Navegar al dashboard si el login es correcto
          this.ngZone.run(() => {
            this.router.navigateByUrl('/dashboard');
          });
        },
        error: (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      })
  }
}
