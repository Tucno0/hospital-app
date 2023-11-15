import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PipesModule } from '../pipes/pipes.module';

import { LayoutPageComponent } from './layout/layout-page/layout-page.component';
import { Grafica1PageComponent } from './pages/grafica1-page/grafica1-page.component';
import { ProgressPageComponent } from './pages/progress-page/progress-page.component';
import { IncrementadorComponent } from './components/incrementador/incrementador.component';
import { DonaComponent } from './components/dona/dona.component';
import { AccountSettingsPageComponent } from './pages/account-settings-page/account-settings-page.component';
import { PromisesPageComponent } from './pages/promises-page/promises-page.component';
import { RxjsPageComponent } from './pages/rxjs-page/rxjs-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { PerfilPageComponent } from './pages/perfil-page/perfil-page.component';
import { UsuariosComponent } from './pages/mantenimientos/usuarios/usuarios.component';
import { ModalImagenComponent } from './components/modal-imagen/modal-imagen.component';
import { HospitalesComponent } from './pages/mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './pages/mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './components/medico/medico.component';
import { BusquedasPageComponent } from './pages/busquedas-page/busquedas-page.component';

@NgModule({
  declarations: [
    LayoutPageComponent,
    Grafica1PageComponent,
    ProgressPageComponent,
    IncrementadorComponent,
    DonaComponent,
    AccountSettingsPageComponent,
    PromisesPageComponent,
    RxjsPageComponent,
    MainPageComponent,
    PerfilPageComponent,
    UsuariosComponent,
    ModalImagenComponent,
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent,
    BusquedasPageComponent,
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class DashboardModule { }
