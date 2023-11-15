import { Component, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'shared-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public titulo?: string;
  public tituloSubs$: Subscription;

  constructor() {
    this.tituloSubs$ = this.getArgumentosRuta()
    .subscribe({
      next: ({ titulo }) => {
        this.titulo = titulo;
        document.title = `Hospital APP - ${titulo}`;
      },
    });

    console.log( this.route.snapshot.children[0].data);
  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta() {
    return this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof ActivationEnd &&
            event['snapshot'].firstChild === null
        ),
        // filter((event: ActivationEnd) => event['snapshot'].firstChild === null)
        map((event: any) => event['snapshot'].data)
      )
  }
}
