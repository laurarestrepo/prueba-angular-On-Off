import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as bootstrap from 'bootstrap';
import { SessionStoreUtil } from '../../../utils/session-store.util';

@Component({
  selector: 'app-prueba-componente',
  templateUrl: './prueba-componente.component.html',
  styleUrls: ['./prueba-componente.component.css']
})
export class PruebaComponenteComponent implements OnInit {
  msjError: string = "";

  constructor(protected messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.tareas = SessionStoreUtil.totalesTateas("GET");
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

  tareas: any[] = [

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
    this.filtro.estado = ''; 
    this.tareasFiltradas = this.tareas; 


  }

  editarTarea(tarea: any) {
    this.tareaSeleccionada = tarea;
    this.nuevaTarea = { ...tarea };
    const modalElement = document.getElementById('createTaskModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show(); 
    }

    SessionStoreUtil.totalesTateas("ELIMINAR", this.tareas);
    SessionStoreUtil.totalesTateas("SET", this.tareas);
    this.limpiar();
  }

  // Método que cambia el estado de la tarea
  cambiarEstadoTarea(tarea: any): void {
    if (tarea.estado === 'pendiente') {
      tarea.estado = 'completada';
    } else if (tarea.estado === 'completada') {
      tarea.estado = 'pendiente';
    }
    SessionStoreUtil.totalesTateas("ELIMINAR", this.tareas);
    SessionStoreUtil.totalesTateas("SET", this.tareas);
  }

  // Función de eliminar tarea
  eliminarTarea(tarea: any) {
    const index = this.tareas.indexOf(tarea);
    if (index > -1) {
      this.tareas.splice(index, 1);
    }
    this.tareasFiltradas = [...this.tareas]; 
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'El registro se ha eliminado con éxito.' });

    SessionStoreUtil.totalesTateas("ELIMINAR", this.tareas);
    SessionStoreUtil.totalesTateas("SET", this.tareas);
  }

  // Función para agregar o actualizar una tarea
  guardarTarea(): void {
    if (this.nuevaTarea.nombreTarea && this.nuevaTarea.responsable) {
      if (this.tareaSeleccionada) {
        const index = this.tareas.indexOf(this.tareaSeleccionada);
        if (index > -1) {
          this.tareas[index] = { ...this.nuevaTarea };
        }
        this.tareaSeleccionada = null; 
      } else {
        // Si no hay tarea seleccionada, agregamos una nueva
        this.tareas.push({ ...this.nuevaTarea });
      }
      this.nuevaTarea = { nombreTarea: '', responsable: '', estado: 'pendiente' }; 
      const modalElement = document.getElementById('createTaskModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal!.hide(); // Cerrar el modal
        document.body.classList.remove('modal-open'); 
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.remove(); 
        }
      }

      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro almacenado con éxito.' });

    } else {
      this.messageService.add({ severity: 'error', summary: 'Éxito', detail: 'Debe diligenciar todos los campos.' });
      this.msjError =
        "Correo electrónico o contraseña incorrectos";
    }

    SessionStoreUtil.totalesTateas("ELIMINAR", this.tareas);
    SessionStoreUtil.totalesTateas("SET", this.tareas);
  }

  // Método trackBy para optimizar el rendimiento en las listas
  trackByTarea(index: number, tarea: any): number {
    return tarea.id;
  }
}
