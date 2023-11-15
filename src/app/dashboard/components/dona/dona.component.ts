import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType, Color } from 'chart.js';
import { ChartEvent } from 'chart.js/dist/core/core.plugins';

@Component({
  selector: 'dashboard-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css'],
})
export class DonaComponent implements OnInit {
  @Input() public title: string = 'Sin título';

  // Doughnut
  @Input() public doughnutChartLabels: string[] = [
    'Label 1',
    'Label 2',
    'Label 3',
  ];

  @Input() public data: number[] = [33.3, 33.3, 33.3];

  public colors: Color[] = ['#6857E6', '#009FEE', '#F02059'];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData?: ChartData<'doughnut'>;

  ngOnInit(): void {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        {
          // label: 'Sales',
          data: this.data,
          // borderColor: '#36A2EB',
          backgroundColor: this.colors,
        },
      ],
    };
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }
}
