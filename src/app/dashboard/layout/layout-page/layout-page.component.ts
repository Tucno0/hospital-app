import { Component, OnInit, inject } from '@angular/core';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { SidebarService } from 'src/app/shared/services/sidebar.service';

declare function customInitFunctions(): any;

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent implements OnInit {
  private settingService = inject(SettingsService)
  private sidebarService = inject(SidebarService);

  ngOnInit(): void {
    customInitFunctions();
    this.sidebarService.cargarMenu();
  }

}
