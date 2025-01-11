import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { ROUTES } from './autenticado-routing';
import { MenuAppModule } from '../menu/menu/menu.module';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';


/**
 * Modulo que contiene todos los artefactos que el usuario
 * puede acceder despues de que se autentique en la app
 */
@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    MenuAppModule,
    SidebarModule,
    CommonModule
  ],
  declarations: [
    BienvenidaComponent,
  ],
  providers: [
  ]
})
export class AutenticadoModule { }
