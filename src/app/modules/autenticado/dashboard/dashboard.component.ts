import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SessionStoreUtil } from '../../../utils/session-store.util';

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
  
 ];
 totalTareas: number = 0;

 constructor(private messageService: MessageService) {}

 ngOnInit(): void {
  this.tareas = SessionStoreUtil.totalesTateas("GET");

   this.setupChart();

   this.totalTareas = this.tareas.length;

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
