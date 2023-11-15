import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environments';
import { GetMedicosResponse } from '../models/interfaces/get-medicos-response.interface';
import { Observable } from 'rxjs';
import { CreateMedicoResponse } from '../models/interfaces/create-medico-response.interface';
import { UpdateMedicoResponse } from '../models/interfaces/update-medico-response.interface';
import { DeleteMedicoResponse } from '../models/interfaces/delete-medico-response.interface';
import { Medico, MedicoSimple } from '../models/medico.interface';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  private baseUrl: string = environment.base_url;
  private http = inject(HttpClient);

  constructor() { }

  private get token(): string {
    return localStorage.getItem('token') || '';
  }

  private get headers(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  public obtenerMedicos(): Observable<GetMedicosResponse> {
    const url = `${this.baseUrl}/medicos`;
    const headers = this.headers;

    return this.http.get<GetMedicosResponse>(url, { headers });
  }

  public obtenerMedicoPorId(id: string): Observable<Medico> {
    const url = `${this.baseUrl}/medicos/${id}`;
    const headers = this.headers;

    return this.http.get<Medico>(url, { headers });
  }

  public crearMedico(medico: { nombre: string, hospital: string }): Observable<CreateMedicoResponse> {
    const url = `${this.baseUrl}/medicos`;
    const headers = this.headers;

    return this.http.post<CreateMedicoResponse>(url, medico, { headers });
  }

  public actualizarMedico(medico: MedicoSimple): Observable<UpdateMedicoResponse> {
    const url = `${this.baseUrl}/medicos/${medico._id}`;
    const headers = this.headers;

    return this.http.put<UpdateMedicoResponse>(url, medico, { headers });
  }

  public borrarMedico(id: string): Observable<DeleteMedicoResponse> {
    const url = `${this.baseUrl}/medicos/${id}`;
    const headers = this.headers;

    return this.http.delete<DeleteMedicoResponse>(url, { headers });
  }
}
