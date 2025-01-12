
import { Routes } from '@angular/router';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { RouterConstant } from './../../constants/router.constant';
import { DashboardComponent } from './dashboard/dashboard.component';

/**
 * Constante que contiene todos los routers que el usuario
 * puede acceder despues de que se autentique en la app
 */
export const ROUTES: Routes = [
  {
    path: '',
    component: BienvenidaComponent,
    children: [
      {
        path: RouterConstant.ROUTER_BIENVENIDA,
        component: DashboardComponent
      },
      {
        path: RouterConstant.ROUTER_ADMINISTRACION,
        data: { preload: true},
        loadChildren: () => import('../administracion/administracion.module').then(m => m.AdministracionModule)
      }
    ]
  }
];
