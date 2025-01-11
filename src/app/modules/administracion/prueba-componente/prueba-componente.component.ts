import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-prueba-componente',
  templateUrl: './prueba-componente.component.html',
  styleUrls: ['./prueba-componente.component.css']
})
export class PruebaComponenteComponent implements OnInit {

  constructor(protected messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    // Inicializar las tareas con todas las tareas
    this.tareasFiltradas = this.tareas;
  }

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
    // Filtrar las tareas según el estado seleccionado
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

  // Función de editar tarea (vacía como se solicitó)
  editarTarea(tarea: any) {
    console.log('Editar tarea:', tarea);
  }

  // Función de eliminar tarea
  eliminarTarea(tarea: any) {

    this.confirmationService.confirm({
      message: '¿Esta seguro que desea eliminar el registro?',
      header: "Confirmación",
      accept: () => {
        const index = this.tareas.indexOf(tarea);
        if (index > -1) {
          this.tareas.splice(index, 1);
        }
        // Después de eliminar, actualizar las tareas filtradas
        this.tareasFiltradas = [...this.tareas]; // Asegurarse de que las tareas filtradas también se actualicen
      }
    });

  }

}
