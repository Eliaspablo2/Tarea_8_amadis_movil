import { Component, OnInit } from '@angular/core';
import { IncidenciasService } from '../incidencias.service';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.page.html',
  styleUrls: ['./acerca.page.scss'],
})
export class AcercaPage implements OnInit {

  constructor(private incidenciasService: IncidenciasService) {}

  ngOnInit() {}

  clearAllData() {
    this.incidenciasService.clearAllData();
  }
}
