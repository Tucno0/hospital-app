import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Coleccion } from '../models/interfaces/coleccion.enum';
import { Observable, map } from 'rxjs';
import { SearchUsersResponse } from '../models/interfaces/search-users-response';
import { SearchHospitalsResponse } from '../models/interfaces/search-hospitals-response';
import { SearchMedicalsResponse } from '../models/interfaces/search-medicals-response';
import { Usuario } from '../models/usuario.model';
import { SearchAllResponse } from '../models/interfaces/search-all-response.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private http = inject(HttpClient);

  private baseUrl = environment.base_url;

  constructor() {}

  private get token(): string {
    return localStorage.getItem('token') || '';
  }

  private get headers(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  private transformarUsuarios( results: any ): Usuario[] {
    const usuarios = results.map(
      (user: any) =>
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
    return usuarios;
  }

  public busquedaGlobal( termino: string ): Observable<SearchAllResponse> {
    const url = `${this.baseUrl}/buscar/todo/${termino}`;
    const headers = this.headers;

    return this.http.get<SearchAllResponse>(url, { headers })
  }

  public buscar( coleccion: Coleccion, termino: string )
  : Observable< SearchUsersResponse | SearchHospitalsResponse | SearchMedicalsResponse > {
    const url = `${this.baseUrl}/buscar/${coleccion}/${termino}`;
    const headers = this.headers;

    return this.http.get<SearchUsersResponse | SearchHospitalsResponse | SearchMedicalsResponse>(url, { headers })
        .pipe(
          map( resp => {
            switch (coleccion) {
              case Coleccion.usuarios:
                return {
                  total: resp.total,
                  results: this.transformarUsuarios(resp.results)
                }

              case Coleccion.hospitales:
                return resp as SearchHospitalsResponse;

              case Coleccion.medicos:
                return resp as SearchMedicalsResponse;

              default:
                return { total: 0, results: [] }
            }
          })
        )
  }
}
