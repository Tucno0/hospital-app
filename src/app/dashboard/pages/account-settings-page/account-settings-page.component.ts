import { Component, OnInit, inject } from '@angular/core';
import { SettingsService } from 'src/app/shared/services/settings.service';

@Component({
  selector: 'app-account-settings-page',
  templateUrl: './account-settings-page.component.html',
  styleUrls: ['./account-settings-page.component.css']
})
export class AccountSettingsPageComponent implements OnInit {
  private settingService = inject(SettingsService)


  ngOnInit(): void {
    this.settingService.checkCurrentTheme();
  }

  public changeTheme(theme: string): void {
    this.settingService.changeTheme(theme);
  }


}
