import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-progress-page',
  templateUrl: './progress-page.component.html',
  styleUrls: ['./progress-page.component.css']
})
export class ProgressPageComponent {
  public progreso1: number = 30;
  public progreso2: number = 80;

}
