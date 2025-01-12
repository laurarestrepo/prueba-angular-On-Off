
import { RouterModule } from '@angular/router';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { ROUTES } from './autenticado-routing';
import { MenuAppModule } from '../menu/menu/menu.module';
import { SidebarModule } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ChartModule } from 'primeng/chart'; // Asegúrate de que esto esté importado

/**
 * Modulo que contiene todos los artefactos que el usuario
 * puede acceder despues de que se autentique en la app
 */
@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    MenuAppModule,
    SidebarModule,
    CommonModule,
    ChartModule,
  ],
  declarations: [
    BienvenidaComponent,
    DashboardComponent
  ],
  providers: [
  ] ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Para mostrar el grafico

})
export class AutenticadoModule { }
