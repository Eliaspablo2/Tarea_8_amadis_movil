import { Component } from '@angular/core';
import { MediaCapture, MediaFile, CaptureAudioOptions } from '@ionic-native/media-capture/ngx';
import { Filesystem, FilesystemDirectory, FilesystemEncoding } from '@capacitor/filesystem';
import { IncidenciasService, Incidencia } from '../incidencias.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage {
  titulo: string = '';
  fecha: string = '';
  descripcion: string = '';
  foto: string = '';
  audio: string = '';

  constructor(private mediaCapture: MediaCapture, private incidenciasService: IncidenciasService) {}

  async recordAudio() {
    const options: CaptureAudioOptions = { limit: 1, duration: 60 };
    try {
      const result = await this.mediaCapture.captureAudio(options);
      if (Array.isArray(result) && result.length > 0) {
        const audioFile = result[0];
        const filePath = audioFile.fullPath;

        // Leer el archivo de audio y guardarlo en el sistema de archivos
        const fileName = `audio_${new Date().getTime()}.wav`;
        const audioData = await Filesystem.readFile({ path: filePath });

        await Filesystem.writeFile({
          path: fileName,
          data: audioData.data,
          directory: FilesystemDirectory.Data,
          encoding: FilesystemEncoding.UTF8
        });

        this.audio = fileName;
        console.log('Audio file saved to', fileName);
      } else {
        console.error('Error capturing audio:', result);
      }
    } catch (error) {
      console.error('Error capturing audio:', error);
    }
  }

  async selectAudio(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const fileName = `audio_${new Date().getTime()}.${file.type.split('/')[1]}`;
        const base64Data = (reader.result as string).split(',')[1];
        
        await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: FilesystemDirectory.Data,
          encoding: FilesystemEncoding.UTF8
        });
        this.audio = fileName;
      };
      reader.readAsDataURL(file);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadPhoto(file);
    }
  }

  async uploadPhoto(file: File) {
    const fileName = `photo_${new Date().getTime()}.${file.type.split('/')[1]}`;
    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = (reader.result as string).split(',')[1];
      await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: FilesystemDirectory.Data,
        encoding: FilesystemEncoding.UTF8
      });
      this.foto = fileName;
      console.log('Photo file saved to', fileName);
    };
    reader.readAsDataURL(file);
  }

  async saveIncidencia() {
    const incidencia: Incidencia = {
      id: `incidencia_${new Date().getTime()}`,
      titulo: this.titulo,
      fecha: this.fecha,
      descripcion: this.descripcion,
      foto: this.foto,
      audio: this.audio
    };
    await this.incidenciasService.addIncidencia(incidencia);
  }
}
