import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dashboard-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit{
  @Input() public progreso: number = 50;
  @Input() public btnClass: string = 'btn-primary';

  @Output() public onProgreso: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
      this.btnClass = `btn ${this.btnClass}`;
  }

  public cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor > 0) {
      this.onProgreso.emit(100);
      return this.progreso = 100;
    }

    if (this.progreso <= 0 && valor < 0) {
      this.onProgreso.emit(0);
      return this.progreso = 0;
    }

    this.progreso += valor;
    this.onProgreso.emit(this.progreso);
    return;
  }

  //* El ngModel tiene un evento que se llama ngModelChange que se dispara cuando el valor cambia
  public onChange(newValue: number) {
    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    this.onProgreso.emit(newValue);
  }

}
