import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Role } from '../models/role.interface';
import { GetRolesResponse } from '../models/interfaces/get-roles-response.interface';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private http = inject(HttpClient);
  private baseUrl = environment.base_url;

  constructor() {
  }

  public obtenerRoles() {
    const url = `${this.baseUrl}/roles`;

    return this.http.get<GetRolesResponse>(url)
  }
}
