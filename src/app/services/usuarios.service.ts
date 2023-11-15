import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

import { environment } from 'src/environments/environments';
import { Usuario } from '../models/usuario.model';
import { RegisterForm } from '../auth/interfaces/register-form.interface';
import { LoginResponse } from '../auth/interfaces/login-response.interface';
import { UpdateUserResponse } from '../models/interfaces/update-user-response.interface';
import { UpdateUserFormData } from '../models/interfaces/update-user-form-data.interface';
import { GetUsersResponse } from '../models/interfaces/get-users-response.interface';
import { DeleteUserResponse } from '../models/interfaces/delete-user-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private baseUrl = environment.base_url;
  private usuario: Usuario = this.authService.usuario;

  constructor() { }

  private get token(): string {
    return localStorage.getItem('token') || '';
  }

  private get headers(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  public get uid(): string {
    return this.usuario.uid || '';
  }

  public crearUsuario( formData: RegisterForm): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/usuarios`, formData)
    .pipe(
      tap( (resp) => {
        localStorage.setItem('token', resp.token);
        // Guardamos el menu en el localStorage
        localStorage.setItem('menu', JSON.stringify(resp.menu));
      })
    )
  }

  public actualizarUsuario( formData: UpdateUserFormData) {
    const url = `${this.baseUrl}/usuarios/${this.uid}`;
    const headers = this.headers;
    const data: UpdateUserFormData = {
      ...formData,
      rol: this.usuario.rol,
    };

    return this.http.put<UpdateUserResponse>(url, data, { headers });
  }

  public guardarUsuario( usuario: Usuario) {
    const url = `${this.baseUrl}/usuarios/${usuario.uid}`;
    const headers = this.headers;

    return this.http.put<UpdateUserResponse>(url, usuario, { headers });
  }

  public cargarUsuarios(desde: number = 0, limite: number = 5): Observable<GetUsersResponse> {
    const url = `${this.baseUrl}/usuarios`;
    const headers = this.headers;
    const params = { desde, limite };

    return this.http.get<GetUsersResponse>(url, { headers, params }).pipe(
      map((resp) => {
        const usuarios = resp.usuarios.map(
          (user) =>
            new Usuario(
              user.nombre,
              user.email,
              user.password,
              user.img,
              user.rol,
              user.google,
              user.uid
            )
        );
        return { ...resp, usuarios };
      })
    );
  }

  public eliminarUsuario( usuario: Usuario ): Observable<DeleteUserResponse> {
    const url = `${this.baseUrl}/usuarios/${usuario.uid}`;
    const headers = this.headers;

    return this.http.delete<DeleteUserResponse>(url, { headers });
  }
}
