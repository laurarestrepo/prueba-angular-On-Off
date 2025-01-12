import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-prueba-componente',
  templateUrl: './prueba-componente.component.html',
  styleUrls: ['./prueba-componente.component.css']
})
export class PruebaComponenteComponent implements OnInit {
  msjError: string = "";

  constructor(protected messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.tareasFiltradas = this.tareas;
  }

  // Nueva tarea (con estado pendiente por defecto)
  nuevaTarea = {
    nombreTarea: '',
    responsable: '',
    estado: 'pendiente' // Estado predeterminado
  };

  // Tarea seleccionada para editar
  tareaSeleccionada: any = null;

  // Mock de datos de tareas
  tareas: any[] = [
    { nombreTarea: 'Tarea 1', responsable: 'Juan', estado: 'pendiente' },
    { nombreTarea: 'Tarea 2', responsable: 'Maria', estado: 'completada' },
    { nombreTarea: 'Tarea 3', responsable: 'Carlos', estado: 'pendiente' }
  ];

  // Variable que almacena las tareas filtradas
  tareasFiltradas: any[] = [];

  // Función para mostrar/ocultar el filtro
  toogleShowFilter() {
    this.isShowFilter = !this.isShowFilter;
  }

  isShowFilter = false;
  filtro = {
    estado: 'pendiente' // El valor por defecto puede ser 'pendiente'
  };

  // Función para cambiar el estado de filtro y filtrar las tareas
  filtrar() {
    if (this.filtro.estado === 'pendiente') {
      this.tareasFiltradas = this.tareas.filter(tarea => tarea.estado === 'pendiente');
    } else if (this.filtro.estado === 'completada') {
      this.tareasFiltradas = this.tareas.filter(tarea => tarea.estado === 'completada');
    }
  }

  // Función para limpiar los filtros y mostrar todas las tareas
  limpiar() {
    this.filtro.estado = ''; // O cualquier valor predeterminado
    this.tareasFiltradas = this.tareas; // Mostrar todas las tareas
  }

  editarTarea(tarea: any) {
    this.tareaSeleccionada = tarea; // Guardar la tarea seleccionada para edición
    this.nuevaTarea = { ...tarea }; // Copiar los valores de la tarea seleccionada al formulario del modal
    
    const modalElement = document.getElementById('createTaskModal');
    if (modalElement) {
      // Usar new bootstrap.Modal() en lugar de getInstance()
      const modal = new bootstrap.Modal(modalElement); 
      modal.show(); // Abrir el modal en modo edición
    }
    
    // Limpiar cualquier estado previo, si es necesario
    this.limpiar();
  }
  
   // Método que cambia el estado de la tarea
   cambiarEstadoTarea(tarea: any): void {
    if (tarea.estado === 'pendiente') {
      tarea.estado = 'completada';
    } else if (tarea.estado === 'completada') {
      tarea.estado = 'pendiente';
    }
  }

  // Función de eliminar tarea
  eliminarTarea(tarea: any) {
    const index = this.tareas.indexOf(tarea);
    if (index > -1) {
      this.tareas.splice(index, 1);
    }
    this.tareasFiltradas = [...this.tareas]; // Asegurarse de que las tareas filtradas también se actualicen
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'El registro se ha eliminado con éxito.' });

  }

  // Función para agregar o actualizar una tarea
  guardarTarea(): void {
    if (this.nuevaTarea.nombreTarea && this.nuevaTarea.responsable) {
      if (this.tareaSeleccionada) {
        // Si hay tarea seleccionada, actualizamos la tarea
        const index = this.tareas.indexOf(this.tareaSeleccionada);
        if (index > -1) {
          this.tareas[index] = { ...this.nuevaTarea };
        }
        this.tareaSeleccionada = null; // Limpiar la tarea seleccionada después de actualizar
      } else {
        // Si no hay tarea seleccionada, agregamos una nueva
        this.tareas.push({ ...this.nuevaTarea });
      }
      this.nuevaTarea = { nombreTarea: '', responsable: '', estado: 'pendiente' }; // Resetear el formulario
      const modalElement = document.getElementById('createTaskModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal!.hide(); // Cerrar el modal
        document.body.classList.remove('modal-open'); // Asegurarse de que no haya el fondo residual
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.remove(); // Eliminar manualmente el backdrop si persiste
        }
      }

      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro almacenado con éxito.' });

    } else {
      this.messageService.add({ severity: 'error', summary: 'Éxito', detail: 'Debe diligenciar todos los campos.' });
      this.msjError = 
      "Correo electrónico o contraseña incorrectos";
    }
  }

}
