import { Component, OnInit } from '@angular/core';
import { ShellState } from './../../../states/shell/shell.state';
import { UsuarioDTO } from '../../../dtos/usuario.dto';
import { SpinnerState } from '../../../states/spinner.state';
import { SessionStoreUtil } from '../../../utils/session-store.util';
import { MenuItemAccionDTO } from '../../../dtos/seguridad/menu/menu-item-accion.dto';
import { MenuItemDTO } from '../../../dtos/seguridad/menu/menu-item.dto';
import { MenuItem } from 'primeng/api';
/**
 * Componente que respalda la pagina de bienvenida
 */
@Component({
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {

   /** Dto que contiene los datos del usuario autenticado */
   public usuario!: UsuarioDTO;
   public modulosVerDashboard : Array<MenuItem> = new Array<MenuItem>;;
  /**
   * @param spinnerState, se utiliza para simular el spinner
   * @param router, se utiliza para navegar en diferentes paginas
   */
  constructor(
    private spinnerState: SpinnerState,
    public shellState: ShellState) {}

  /**
   * Se debe inicializar las variables cuando se crea el component
   */
  ngOnInit(): void {
    this.usuario = SessionStoreUtil.auth("GET").usuario;
    this.spinnerState.displaySpinner();
    setTimeout(() => {
      this.spinnerState.hideSpinner();
    }, 100);
  }


  
  
}
