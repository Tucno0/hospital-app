import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone, inject } from '@angular/core';
import { LoginForm } from '../interfaces/login-form.interface';
import { environment } from 'src/environments/environments';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response.interface';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  // Se usa NgZone para que la navegación se ejecute dentro de la zona de Angular y no de la zona de Google
  private ngZone = inject(NgZone);
  private baseUrl = environment.base_url;

  public usuario!: Usuario;

  constructor() { }

  public get role(){
    return this.usuario.rol;
  }

  public login( formData: LoginForm): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, formData)
      .pipe(
        tap( (resp) => {
          localStorage.setItem('token', resp.token);
          // Guardamos el menu en el localStorage
          localStorage.setItem('menu', JSON.stringify(resp.menu));
        })
      )
  }

  public loginGoogle( token: string ): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/google`, { token })
      .pipe(
        tap( (resp) => {
          localStorage.setItem('token', resp.token);
          // Guardamos el menu en el localStorage
          localStorage.setItem('menu', JSON.stringify(resp.menu));
        })
      )
  }

  public validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<LoginResponse>(`${this.baseUrl}/auth/renew`, { headers })
      .pipe(
        map( (resp) => {
          // desestructuramos el objeto usuario que viene en la respuesta
          const { nombre, email, img = '', rol, estado, google, uid } = resp.usuario;
          // creamos un nuevo objeto usuario con los datos de la respuesta
          this.usuario = new Usuario(nombre, email, '', img, rol, google, uid);

          // Renovar el token en el localStorage
          localStorage.setItem('token', resp.token);
          // Guardamos el menu en el localStorage
          localStorage.setItem('menu', JSON.stringify(resp.menu));

          return true;
        }),
        map( (resp) => true),
        // Si hay un error en la petición, el catchError devuelve un observable con false
        catchError( err => of(false))
      )
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    google.accounts.id.revoke(this.usuario.email, () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/auth');
      });
    })
  }
}
