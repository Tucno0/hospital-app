import { HospitalSimple } from "./hospital.interface";
import { UsuarioSimple } from "./usuario.model";

export interface Medico {
  _id: string;
  nombre: string;
  img?: string;
  usuario?: UsuarioSimple;
  hospital?: HospitalSimple;
}

export interface MedicoSimple {
  _id: string;
  nombre: string;
  img?: string;
  usuario?: string;
  hospital?: string;
}

