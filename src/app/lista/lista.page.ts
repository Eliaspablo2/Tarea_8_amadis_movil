import { Component, OnInit } from '@angular/core';
import { IncidenciasService, Incidencia } from '../incidencias.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  incidencias: Incidencia[] = [];

  constructor(private incidenciasService: IncidenciasService) {}

  ngOnInit() {
    this.incidencias = this.incidenciasService.getIncidencias();
  }
}
