import { Component } from '@angular/core';               // Importa el decorador @Component de Angular
import { RouterOutlet, RouterLink } from '@angular/router'; // Importa los módulos de enrutamiento para vistas y enlaces

@Component({
  selector: 'app-root',                                 // Nombre de la etiqueta HTML de este componente
  standalone: true,                                     // Indica que es un componente independiente (no forma parte de ningún NgModule)
  imports: [RouterOutlet, RouterLink],                  // Declara los módulos que usarán su template (lazy-loaded en este componente)
  templateUrl: './app.component.html',                  // Ruta al archivo HTML que define la vista
  styleUrls: ['./app.component.css']                    // Ruta(s) al/los archivo(s) CSS con estilos de este componente
})
export class AppComponent {
  title = 'frontend';                                   // Propiedad pública que se puede usar en la plantilla ({{ title }})
}
