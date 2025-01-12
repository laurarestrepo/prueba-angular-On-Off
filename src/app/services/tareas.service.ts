import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tareasSubject = new BehaviorSubject<any[]>([]); // Guardar tareas en el BehaviorSubject
  tareas$ = this.tareasSubject.asObservable(); // Exponer el Observable

  constructor() {}

  // Obtener las tareas directamente desde el BehaviorSubject
  obtenerTareas(): any[] {
    return this.tareasSubject.getValue(); // Usamos getValue() para obtener las tareas actuales
  }

  // Método para cargar tareas
  cargarTareas() {
    // Aquí puedes cargar las tareas desde una fuente externa o inicializar datos mockeados
    const tareasIniciales = [
      { nombreTarea: 'Tarea 1', responsable: 'Juan', estado: 'pendiente' },
      { nombreTarea: 'Tarea 2', responsable: 'Maria', estado: 'completada' },
      { nombreTarea: 'Tarea 3', responsable: 'Carlos', estado: 'pendiente' },
      { nombreTarea: 'Tarea 4', responsable: 'Pedro', estado: 'completada' },
    ];
    this.tareasSubject.next(tareasIniciales); // Actualiza el BehaviorSubject con las tareas cargadas
  }

  // Actualizar tareas (insertar o editar)
  actualizarTareas(tareas: any[]): void {
    this.tareasSubject.next(tareas); // Actualizamos el BehaviorSubject
  }

  // Eliminar una tarea
  eliminarTarea(tarea: any): void {
    const tareas = this.obtenerTareas(); // Obtenemos las tareas actuales
    const index = tareas.indexOf(tarea);
    if (index > -1) {
      tareas.splice(index, 1);
      this.actualizarTareas(tareas); // Actualizamos el estado
    }
  }

  // Agregar nueva tarea
  agregarTarea(tarea: any): void {
    const tareas = this.obtenerTareas(); // Obtenemos las tareas actuales
    tareas.push(tarea); // Agregamos la nueva tarea
    this.actualizarTareas(tareas); // Actualizamos el estado
  }

  // Cambiar el estado de una tarea
  cambiarEstadoTarea(tarea: any): void {
    const tareas = this.obtenerTareas(); // Obtenemos las tareas actuales
    const index = tareas.indexOf(tarea);
    if (index > -1) {
      tareas[index].estado = tareas[index].estado === 'pendiente' ? 'completada' : 'pendiente';
      this.actualizarTareas(tareas); // Actualizamos el estado
    }
  }
}
