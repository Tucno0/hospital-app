import { Component } from '@angular/core';
import { ChartData, ChartType, Color } from 'chart.js';
import { ChartEvent } from 'chart.js/dist/core/core.plugins';

@Component({
  selector: 'app-grafica1-page',
  templateUrl: './grafica1-page.component.html',
  styles: [],
})
export class Grafica1PageComponent {
  public labels1: string[] = ['Pan', 'Refresco', 'Cerveza'];

  public data1: number[] = [10, 20, 30];
}
