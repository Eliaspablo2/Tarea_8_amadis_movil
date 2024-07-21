import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IncidenciasService, Incidencia } from '../incidencias.service';
import { Filesystem, FilesystemDirectory, FilesystemEncoding } from '@capacitor/filesystem';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {
  incidencia: Incidencia | undefined;
  fotoUrl: string | undefined;
  audioUrl: string | undefined;

  constructor(private route: ActivatedRoute, private incidenciasService: IncidenciasService) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.incidencia = this.incidenciasService.getIncidencias().find(incidencia => incidencia.id === id);

    if (this.incidencia) {
      await this.loadFile(this.incidencia.foto, 'foto');
      await this.loadFile(this.incidencia.audio, 'audio');
    }
  }

  async loadFile(fileName: string, type: 'foto' | 'audio') {
    try {
      const result = await Filesystem.readFile({
        path: fileName,
        directory: FilesystemDirectory.Data,
        encoding: FilesystemEncoding.UTF8
      });

      if (type === 'foto') {
        this.fotoUrl = `data:image/${fileName.split('.').pop()};base64,${result.data}`;
      } else if (type === 'audio') {
        this.audioUrl = `data:audio/${fileName.split('.').pop()};base64,${result.data}`;
      }
    } catch (error) {
      console.error('Error loading file', error);
    }
  }
}
