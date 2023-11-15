import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.interface';
import { Coleccion } from 'src/app/models/interfaces/coleccion.enum';
import { Medico } from 'src/app/models/medico.interface';
import { Usuario } from 'src/app/models/usuario.model';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'dashboard-busquedas-page',
  templateUrl: './busquedas-page.component.html',
  styleUrls: ['./busquedas-page.component.css'],
})
export class BusquedasPageComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private searchService = inject(SearchService);

  public totalResultados: number = 0;
  public totalUsuarios:   number = 0;
  public totalHospitales: number = 0;
  public totalMedicos:    number = 0;

  public usuarios!:        Usuario[];
  public hospitales!:      Hospital[];
  public medicos!:         Medico[];

  public usuariosColeccion = Coleccion.usuarios;
  public hospitalesColeccion = Coleccion.hospitales;
  public medicosColeccion = Coleccion.medicos;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ termino }) => {
      this.busquedaGlobal(termino);
    });
  }

  public busquedaGlobal(termino: string) {
    this.searchService.busquedaGlobal(termino)
      .subscribe( resp => {
        this.totalResultados = resp.totalResultados;
        this.totalUsuarios   = resp.totalUsuarios;
        this.totalHospitales = resp.totalHospitales;
        this.totalMedicos    = resp.totalMedicos;

        this.usuarios        = resp.usuarios;
        this.hospitales      = resp.hospitales;
        this.medicos         = resp.medicos;
      });
  }

  public abrirMedico(id: string) {
    if (!id || id.trim().length === 0) {
      return;
    }

    this.router.navigateByUrl(`/dashboard/medico/${id}`);
  }
}
