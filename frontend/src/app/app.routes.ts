// Importamos el tipo Route para definir rutas en Angular
import { Routes } from '@angular/router';
// Importamos los componentes que usaremos en cada ruta
import { ContactListComponent } from './contacts/components/contact-list/contact-list.component';
import { ContactAddComponent } from './contacts/components/contact-add/contact-add.component';

// Definimos el array de rutas de la aplicación
export const routes: Routes = [
  // Ruta raíz (vacía): redirige a 'contacts'
  // pathMatch: 'full' indica que la URL debe coincidir exactamente con ''
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },

  // Ruta '/contacts': muestra la lista de contactos
  { path: 'contacts', component: ContactListComponent },

  // Ruta '/contacts/add': muestra el formulario para añadir un contacto
  { path: 'contacts/add', component: ContactAddComponent },

  // Ruta comodín '**': captura cualquier URL no definida y redirige a 'contacts'
  // Útil para manejar 404s o rutas inválidas
  { path: '**', redirectTo: 'contacts' }
];
