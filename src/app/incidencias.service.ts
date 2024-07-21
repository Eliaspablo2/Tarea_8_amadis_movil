import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Incidencia {
  id: string;
  titulo: string;
  fecha: string;
  descripcion: string;
  foto: string;
  audio: string;
}

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {
  private incidencias: Incidencia[] = [];
  private storageInitialized = false;

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    await this.storage.create();
    this.storageInitialized = true;
    await this.loadIncidencias();
  }

  private async assertStorageInitialized() {
    if (!this.storageInitialized) {
      throw new Error('Storage not initialized. Call init() first.');
    }
  }

  async loadIncidencias() {
    await this.assertStorageInitialized();
    const storedIncidencias = await this.storage.get('incidencias');
    if (storedIncidencias) {
      this.incidencias = storedIncidencias;
    }
  }

  getIncidencias(): Incidencia[] {
    return this.incidencias;
  }

  async addIncidencia(incidencia: Incidencia) {
    await this.assertStorageInitialized();
    this.incidencias.push(incidencia);
    await this.storage.set('incidencias', this.incidencias);
  }

  async clearAllData() {
    await this.assertStorageInitialized();
    this.incidencias = [];
    await this.storage.clear();
  }
}
