import { UsuarioSimple } from "./usuario.model";

export interface Hospital {
  nombre: string;
  _id: string;
  img?: string;
  usuario?: UsuarioSimple;
}

export interface HospitalSimple {
  _id: string;
  nombre: string;
  img?: string;
}

