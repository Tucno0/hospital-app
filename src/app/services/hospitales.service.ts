import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environments';
import { GetHospitalsResponse } from '../models/interfaces/get-hospitals-response';
import { CreateHospitalResponse } from '../models/interfaces/create-hospital-response.interface';
import { Observable } from 'rxjs';
import { UpdateHospitalResponse } from '../models/interfaces/update-hospital-response.interface';
import { DeleteHospitalResponse } from '../models/interfaces/delete-hospital-response.interface';

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {
  private baseUrl: string = environment.base_url;
  private http = inject(HttpClient);

  constructor() { }

  private get token(): string {
    return localStorage.getItem('token') || '';
  }

  private get headers(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  public obtenerHospitales(): Observable<GetHospitalsResponse> {
    const url = `${this.baseUrl}/hospitales`;
    const headers = this.headers;

    return this.http.get<GetHospitalsResponse>(url, { headers })
  }

  public crearHospital(nombre: string): Observable<CreateHospitalResponse> {
    const url = `${this.baseUrl}/hospitales`;
    const headers = this.headers;

    return this.http.post<CreateHospitalResponse>(url, { nombre }, { headers });
  }

  public actualizarHospital(id: string, nombre: string): Observable<UpdateHospitalResponse> {
    const url = `${this.baseUrl}/hospitales/${id}`;
    const headers = this.headers;

    return this.http.put<UpdateHospitalResponse>(url, { nombre }, { headers });
  }

  public borrarHospital(id: string): Observable<DeleteHospitalResponse> {
    const url = `${this.baseUrl}/hospitales/${id}`;
    const headers = this.headers;

    return this.http.delete<DeleteHospitalResponse>(url, { headers });
  }
}
