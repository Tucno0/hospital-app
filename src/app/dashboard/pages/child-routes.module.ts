import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Principal
import { adminGuard } from 'src/app/auth/guards/admin.guard';
import { Error404PageComponent } from 'src/app/shared/pages/error404-page/error404-page.component';
import { AccountSettingsPageComponent } from './account-settings-page/account-settings-page.component';
import { Grafica1PageComponent } from './grafica1-page/grafica1-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PerfilPageComponent } from './perfil-page/perfil-page.component';
import { ProgressPageComponent } from './progress-page/progress-page.component';
import { PromisesPageComponent } from './promises-page/promises-page.component';
import { RxjsPageComponent } from './rxjs-page/rxjs-page.component';

// Mantenimientos
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from '../components/medico/medico.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { BusquedasPageComponent } from './busquedas-page/busquedas-page.component';

const childRoutes: Routes = [
  // data: { titulo: 'Progress'} es para enviar un titulo a la pagina
  { path: '', component: MainPageComponent, data: { titulo: 'Dashboard'}},
  { path: 'progress', component: ProgressPageComponent, data: { titulo: 'Progress'} },
  { path: 'graficas1', component: Grafica1PageComponent, data: { titulo: 'Graficas'} },
  { path: 'account-settings', component: AccountSettingsPageComponent, data: { titulo: 'Ajustes del Tema'}},
  { path: 'promesas', component: PromisesPageComponent, data: { titulo: 'Promesas'}},
  { path: 'rxjs', component: RxjsPageComponent, data: { titulo: 'RxJs'}},
  { path: 'perfil', component: PerfilPageComponent, data: { titulo: 'Perfil de Usuario'}},
  { path: 'busqueda/:termino', component: BusquedasPageComponent, data: { titulo: 'Buscador'}},

  // Mantinimentos
  // Rutas de ADMIN_ROLE
  {
    path: 'usuarios',
    canActivate: [adminGuard],
    component: UsuariosComponent,
    data: { titulo: 'Usuarios de la Aplicación'}
  },

  // Rutas de USER_ROLE
  { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales'}},
  { path: 'medicos', component: MedicosComponent, data: { titulo: 'Médicos'}},
  { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Médico'}},

  // Rutas que no existen
  { path: '', redirectTo: 'progress', pathMatch: 'full'},
  { path: '**', component: Error404PageComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(childRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class ChildRoutesModule { }
