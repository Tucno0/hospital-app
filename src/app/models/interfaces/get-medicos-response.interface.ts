// Generated by https://quicktype.io

import { Medico } from "../medico.interface";
import { Usuario } from "../usuario.model";

export interface GetMedicosResponse {
  total:              number;
  medicos:            Medico[];
  usuarioAutenticado: Usuario;
}