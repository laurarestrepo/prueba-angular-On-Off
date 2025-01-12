import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterConstant } from './../../../constants/router.constant';
import { ShellState } from '../../../states/shell/shell.state';
import { MenuItem } from 'primeng/api';
import { Location } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { AutenticacionResponseDTO } from '../../../dtos/seguridad/autenticacion/autenticacion-response.dto';
import { SpinnerState } from '../../../states/spinner.state';
import { SessionStoreUtil } from '../../../utils/session-store.util';
import { LabelsConstant } from '../../../constants/labels.constant';

/**
 * Es el Header del shell de la aplicacion, contiene el menu de las
 * configuraciones del usuario, cierre de sesion
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('icon-open-close', [
      state('icon-open-menu', style({ 'margin-left': '241px' })),
      transition('* => *', animate(300))
    ])
  ]
})
export class HeaderComponent implements OnInit {

  /** Variable que almacena la fecha actual */
  public time!: Date;

  /** Son los items a mostrar en el menu de user-settings */
  public items!: MenuItem[];

  /** Son los datos de la autenticacion */
  public dataAutenticacion!: AutenticacionResponseDTO;

  /**
   * @param shellState, se utiliza para mostrar/ocultar el menu
   * y validar el tamanio de la pantalla
   *
   * @param router, se utiliza para redireccionar a la pagina
   * de bienvenida
   * 
   * @param spinnerState, se utiliza para simular el spinner
   */
  constructor(
    public shellState: ShellState,
    private router: Router,
    private spinnerState: SpinnerState,
    private location: Location) {}

  /**
   * Se construye el menu de configuracion de cuenta
   */
  ngOnInit() {
    this.init();
  }

  /**
   * Metodo que soporta el evento cerrar sesion del menu
   */
  public cerrarSesion(): void {
    this.shellState.cerrarSesion();
  }

  /**
   * Metodo que soporta el evento click del menu Pagina de inicio
   */
  public goToBienvenida(): void {
    this.router.navigate([RouterConstant.NAVIGATE_BIENVENIDA]);
  }


  /**
   * Metodo que permite construir los items del menu
   * de configuraciones para el Usuario
   */
  private construirItemsUser(): void {
    this.items = [
      {
        label: LabelsConstant.MENU_PAGINA_INICIO,
        icon: 'fa fa-fw fa-home font-size-18 mr-1',
        command: (click) => this.goToBienvenida()
      },
      { label: LabelsConstant.CERRAR_SESION,
        icon: 'fa fa-fw fa-power-off font-size-18 mr-1',
        command: (click) => this.cerrarSesion()
      }
    ];
  }

  /**
   * Metodo que es invocado al momento de la creacion
   * del componente, donde se procede a consultar los
   * datos iniciales requeridos de la funcionalidad
   */
  private init(): void {

    // se configura la hora del cliente
    setInterval(() => {
      this.time = new Date();
    }, 100);

    // se construye los items del usuario
    this.construirItemsUser();

    // se configura los datos de la autenticacion
    this.dataAutenticacion = SessionStoreUtil.auth("GET");


  }
  
}
