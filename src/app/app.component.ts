import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Crear Envidencia', url: 'crear', icon: 'Add' },
    { title: 'Lista de Envidencia', url: 'lista', icon: 'clipboard' },
    { title: 'Acerca de', url: 'acerca', icon: 'person' },
  ];

  constructor() {}
}
