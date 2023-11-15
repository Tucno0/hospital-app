export interface Usuario {
  nombre: string;
  email:  string;
  img?:    string;
  rol:    'ADMIN_ROLE' | 'USER_ROLE';
  estado: boolean;
  google: boolean;
  uid:    string;
}
