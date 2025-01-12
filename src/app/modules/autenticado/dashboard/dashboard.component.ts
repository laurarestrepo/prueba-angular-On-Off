import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 // Datos del gráfico
 chartData: any;
 chartOptions: any;

 // Mock de datos de tareas (se pueden tomar de una fuente real como un servicio)
 tareas: any[] = [
   { nombreTarea: 'Tarea 1', responsable: 'Juan', estado: 'pendiente' },
   { nombreTarea: 'Tarea 2', responsable: 'Maria', estado: 'completada' },
   { nombreTarea: 'Tarea 3', responsable: 'Carlos', estado: 'pendiente' },
   { nombreTarea: 'Tarea 4', responsable: 'Pedro', estado: 'completada' },
 ];

 constructor(private messageService: MessageService) {}

 ngOnInit(): void {
   this.setupChart();
 }

 // Configuración de los datos y opciones del gráfico
 setupChart() {
   const tareasPendientes = this.tareas.filter(tarea => tarea.estado === 'pendiente').length;
   const tareasCompletadas = this.tareas.filter(tarea => tarea.estado === 'completada').length;

   this.chartData = {
     labels: ['Tareas Pendientes', 'Tareas Completadas'],
     datasets: [
       {
         data: [tareasPendientes, tareasCompletadas],
         backgroundColor: ['#f39c12', '#27ae60'], // Colores
         hoverBackgroundColor: ['#e67e22', '#2ecc71'] // Colores al hacer hover
       }
     ]
   };

   this.chartOptions = {
     responsive: true,
     legend: {
       position: 'top',
       labels: {
         fontColor: '#000',
       }
     },
     plugins: {
       tooltip: {
         callbacks: {
           label: function(tooltipItem: any) {
             return tooltipItem.raw + ' tareas';
           }
         }
       }
     }
   };
 }


}
