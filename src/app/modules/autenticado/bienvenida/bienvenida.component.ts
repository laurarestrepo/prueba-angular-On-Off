import { Component, OnInit } from '@angular/core';
import { ShellState } from './../../../states/shell/shell.state';
import { UsuarioDTO } from '../../../dtos/usuario.dto';
import { SpinnerState } from '../../../states/spinner.state';
import { SessionStoreUtil } from '../../../utils/session-store.util';
import { MenuItemAccionDTO } from '../../../dtos/seguridad/menu/menu-item-accion.dto';
import { MenuItemDTO } from '../../../dtos/seguridad/menu/menu-item.dto';
import { MenuItem } from 'primeng/api';
import { animate, state, style, transition, trigger } from '@angular/animations';
/**
 * Componente que respalda la pagina de bienvenida
 */
@Component({
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css'],
  animations: [
    trigger('openClose', [
      state('open-menu', style({ left: '0px' })),
      state('closed-menu', style({ left: '-240px', 'min-width': '0px', width: '0px' })),
      state('open-menu-content', style({ 'margin-left' : '241px' })),
      state('closed-menu-content', style({ 'margin-left' : '0px' })),
      transition('* => *', animate(300))
    ])
  ]
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
    public shellState: ShellState,
  ) {}

  /**
   * Se debe inicializar las variables cuando se crea el component
   */
  ngOnInit(): void {
    this.usuario = SessionStoreUtil.auth("GET").usuario;
    const items: Array<MenuItemDTO> = SessionStoreUtil.menu("GET");
    this.shellState.iniciarmenu(items);

    this.spinnerState.displaySpinner();
    setTimeout(() => {
      this.spinnerState.hideSpinner();
    }, 100);
  }


  
  
}
