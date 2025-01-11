import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PruebaComponenteComponent } from './prueba-componente/prueba-componente.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {  ConfirmDialogModule } from 'primeng/confirmdialog';

/*
 * Modulo que contiene todos los componentes relacionados
 * a todos los procesos de negocio administrativo
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DropdownModule,
    ToastModule,
    ConfirmDialogModule,
    RouterModule.forChild([
      {
        path: 'prueba/prueba-componente',
        component: PruebaComponenteComponent
      },
    ]),
  ],
  declarations: [   
  PruebaComponenteComponent],
  providers:[ConfirmationService, ]
})
export class AdministracionModule {}
