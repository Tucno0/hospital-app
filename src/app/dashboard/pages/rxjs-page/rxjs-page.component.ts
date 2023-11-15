import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, filter, interval, map, retry, take } from 'rxjs';

@Component({
  selector: 'app-rxjs-page',
  templateUrl: './rxjs-page.component.html',
  styleUrls: ['./rxjs-page.component.css']
})
export class RxjsPageComponent implements OnDestroy {

  public counter = 0;
  public intervalSubs?: Subscription;

  constructor() {

    // this.retornaObservable()
    // .pipe(
    //   retry(2) // retry es un operador que permite reintentar la ejecución de un observable en caso de error el número de veces que se le indique
    // )
    // .subscribe({
    //   next: (value) => console.log('next', value),
    //   error: (err) => console.log('error', err),
    //   complete: () => console.log('complete')
    // });

    this.intervalSubs = this.retornaInterval()
      .subscribe((value) => {
        console.log(value);
        this.counter = value
      });

  }

  ngOnDestroy(): void {
      this.intervalSubs?.unsubscribe();
  }

  public retornaInterval() {
    return interval(1000)
      .pipe(
        filter<number>(value => value !== 0),
        take<number>(20),
        map<number, number>(value => value*5)
      )
  }

  public retornaObservable(): Observable<number> {
    let count = 0;

    return new Observable<number>(subscriber => {
      setInterval(() => {
        subscriber.next(count++);
        if (count === 5) {
          subscriber.complete();
        }
        if (count === 3) {
          subscriber.error('count is 7');
        }

      }, 1000);
    });
  }

  getPercent() {
    return `css-bar-${this.counter}`;
  }
}
