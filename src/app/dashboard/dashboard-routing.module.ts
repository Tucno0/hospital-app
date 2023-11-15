import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPageComponent } from './layout/layout-page/layout-page.component';
import { adminCanMatchGuard } from '../auth/guards/admin.can-match.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    canMatch: [adminCanMatchGuard],
    loadChildren: () => import('./pages/child-routes.module').then(m => m.ChildRoutesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
