// Importaciones principales de Angular y tu servicio de contactos
import { Component, OnInit } from '@angular/core';             // @Component y ciclo de vida ngOnInit
import { CommonModule } from '@angular/common';                // Directivas como *ngIf, *ngFor
import { FormsModule } from '@angular/forms';                  // [(ngModel)] para enlace bidireccional
import { ContactService, Contact } from '../../services/contact.service'; 
                                                               // Servicio HTTP y tipo Contact

@Component({
  selector: 'app-contact-list',          // <app-contact-list> en tu HTML
  standalone: true,                      // No requiere declararse en ningún NgModule
  imports: [CommonModule, FormsModule],  // Módulos que usa su plantilla
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];          // Aquí guardamos el array de contactos
  editId: number | null = null;      // ID del contacto que estamos editando
  name = '';                         // Campos auxiliares para editar
  email = '';
  phone = '';
  loading = false;                   // Flag para desactivar botones mientras carga

  // Inyecta el servicio que hace las peticiones HTTP
  constructor(private svc: ContactService) {}

  // Se ejecuta cuando el componente se inicia por primera vez
  ngOnInit() {
    this.load();                     // Lanza la carga inicial de contactos
  }

  /**
   * load(): pide al servicio todos los contactos
   * - this.svc.getAll() devuelve un Observable<Contact[]>
   * - .subscribe(...) arranca la llamada HTTP y maneja la respuesta
   */
  load() {
    this.svc.getAll()
      .subscribe(list => {
        // Este callback se ejecuta cuando llegan los datos
        this.contacts = list;        // Actualiza el array para que la vista se renderice
      });
  }

  /**
   * startEdit(): prepara el formulario en línea con los datos del contacto
   */
  startEdit(c: Contact) {
    this.editId = c.id!;           // Activa el modo edición para ese ID
    this.name = c.name;            // Carga los valores actuales en los inputs
    this.email = c.email;
    this.phone = c.phone || '';
  }

  /**
   * save(): envía los cambios al servidor
   */
  save(c: Contact) {
    // Validación básica
    if (!this.name.trim() || !this.email.trim()) return;

    // Actualiza el objeto contact con los nuevos valores
    c.name = this.name;
    c.email = this.email;
    c.phone = this.phone;

    // svc.update(c) → Observable<Contact>; al suscribirnos:
    this.svc.update(c)
      .subscribe(() => {
        // Este callback se ejecuta cuando la petición PUT termina exitosamente
        this.editId = null;       // Salimos del modo edición
        this.load();              // Volvemos a cargar la lista para ver cambios
      });
  }

  /**
   * cancel(): sale del modo edición sin guardar
   */
  cancel() {
    this.editId = null;
  }

  /**
   * delete(): elimina un contacto tras confirmación
   */
  delete(c: Contact) {
    if (!confirm(`¿Borrar a ${c.name}?`)) return;

    this.loading = true;          // Desactiva botones mientras llega la respuesta

    // svc.delete(c.id!) → Observable<void>
    this.svc.delete(c.id!)
      .subscribe(() => {
        // Al completarse la petición DELETE:
        this.loading = false;     // Reactiva botones
        this.load();              // Refresca la lista sin el contacto eliminado
      });
  }
}

// Punto clave: .subscribe()
// Los Observables son “perezosos”: hasta que no llamas .subscribe(), no se realiza la petición HTTP.

// Al suscribirnos:

// Se lanza la llamada HTTP

// RxJS nos notifica con el callback next (aquí, la función que recibe list o confirma la eliminación/actualización)

// Podemos manejar errores o completar la operación si fuera necesario (con callbacks error y complete).

// En tu componente, cada vez que llamas a un método del servicio (getAll, update, delete), haces .subscribe(...) para:

// Iniciar la petición.

// Procesar la respuesta y actualizar el estado local (contacts, loading, editId, etc.).

// Re-renderizar la vista automáticamente gracias al binding de Angular.