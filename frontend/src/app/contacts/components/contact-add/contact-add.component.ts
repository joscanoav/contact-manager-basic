// 1) Importaciones necesarias de Angular y servicios personalizados
import { Component } from '@angular/core';           // Decorador para definir un componente
import { CommonModule } from '@angular/common';       // Módulo con directivas comunes (ngIf, ngFor…)
import { FormsModule} from '@angular/forms'; // FormsModule para ngModel y NgForm si quisieras usar referencias al formulario
import { Router } from '@angular/router';             // Servicio para navegación programática
import { ContactService } from '../../services/contact.service'; // Servicio propio para manejar contactos

@Component({
  // 2) Metadata del componente
  selector: 'app-contact-add',        // Etiqueta HTML con la que se invoca este componente
  standalone: true,                   // Marca el componente como independiente (no necesita NgModule)
  imports: [CommonModule, FormsModule], // Módulos que utiliza este componente en su template
  templateUrl: './contact-add.component.html', // Ruta al archivo HTML de la vista
  styleUrls: ['./contact-add.component.css']   // Ruta al archivo CSS de estilos
})
export class ContactAddComponent {
  // 3) Propiedades del componente — enlazadas con [(ngModel)] en el template
  name = '';   // Nombre del nuevo contacto
  email = '';  // Email del nuevo contacto
  phone = '';  // Teléfono (opcional) del nuevo contacto

  // 4) Inyección de dependencias
  //    - svc: instancia de ContactService para llamar a la API o lógica de datos
  //    - router: instancia de Router para redirigir tras guardar
  constructor(
    private svc: ContactService,
    private router: Router
  ) {}

  // 5) Método que se ejecuta al enviar el formulario (ngSubmit)="save()"
  save() {
    // 5.1) Validación básica en TS además de la validación en el template
    if (!this.name.trim() || !this.email.trim()) {
      // Si name o email están vacíos o solo espacios…
      alert('Nombre y email obligatorios');
      return; // Detiene la ejecución de save()
    }
    // 5.2) Llamada al servicio para añadir el contacto
    this.svc
      .add({                             // Envía un objeto con los tres campos
        name: this.name,
        email: this.email,
        phone: this.phone
      })
      .subscribe(() =>                   // Al completarse la petición…
        this.router.navigate(['/contacts']) // …navega a la lista de contactos
      );
  }

  // 6) Método alternativo de validación manual (comentado)
  //    Se dispararía al hacer click antes de ngSubmit, pudiendo cancelar el envío:
  // validateEmail(event: Event) {
  //   // Regex muy básica de “algo@algo.algo”
  //   const re = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  //   if (!re.test(this.email.trim())) {
  //     event.preventDefault();            // Evita que llegue a save()
  //     alert('❌ El email no es válido. Por favor corrígelo.');
  //   }
  // }
}
