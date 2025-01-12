import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenST } from './shell-states/screen.st';
import { MenuST } from './shell-states/menu.st';
import { UserAccountST } from './shell-states/user-account.st';
import { BreadCrumbST } from './shell-states/breadcrumb.st';
import { RouterConstant } from '../../constants/router.constant';
import { SessionStoreUtil } from '../../utils/session-store.util';

/**
 * Se utiliza para administrar el estado del Shell de la aplicacion
 */
@Injectable({ providedIn: 'root' })
export class ShellState {

  /** Administra el estado de la pantalla del dispositivo */
  public screen: ScreenST;

  /** Administra el estado de la miga de pan */
  public breadCrumb: BreadCrumbST;

  /** Administra el estado del menu de la aplicacion */
  public menu: MenuST;

  /** Administra el estado de la cuenta de usuario */
  public userAccount: UserAccountST;

  /** Se utiliza para visualizar el modal timeout */
  public modalTimeOut: any;

  /** cuenta regresiva para el timeout */

  /** Datos del usuario */
  public auth: any;

  /**
   * @param router, se utiliza para ser notificado cuando el router cambia
   * @param idle, se utiliza para activar el timeout
   * @param keepalive, se utiliza para hacer ping en la conexion
   */
  constructor(
    private router: Router,) {
    this.auth = SessionStoreUtil.auth("GET");
   

    // Estado para notificar el tamanio de la pantalla
    this.screen = new ScreenST();

    // Estado para administrar la cuenta del usuario
    this.userAccount = new UserAccountST();

    // Estado para administar la miga de pan
    this.breadCrumb = new BreadCrumbST();

    // Se utiliza para administrar el estado del Menu
    this.menu = new MenuST(this.screen, this.breadCrumb, this.router);

  }

  /**
   *
   * Metodo que soporta el evento iniciar sesion del login
   *
   * @param dataBienvenida, DTO con los datos de bienvenida
   * @param dataAutenticacion, DTO con los datos de la autenticacion
   */
  public iniciarSesion(itemsMenu: any,
    dataAutenticacion: any): void {

    // se cambia el estado de la cuenta a sesion iniciada
    this.userAccount.changeStateAutenticado(dataAutenticacion);

    // se construye el menu de la aplicacion
    this.menu.initMenu(itemsMenu);

  
    // se redirecciona a la pagina de bienvenida
    this.router.navigate([RouterConstant.NAVIGATE_BIENVENIDA]);
  }

  iniciarmenu(items:any){
     // se construye el menu de la aplicacion
     this.menu.initMenu(items);

  }
  /**
   * Metodo que soporta el evento cerrar sesion del menu
   */
  public cerrarSesion(): void {
  
    // se cambia el estado de la cuenta a sesion cerrada
    this.userAccount.changeStateSesionCerrada();

    // se destruye el menu para limpiar memoria
    this.menu.destroyMenu();

    // se para el timeout sesion
 
    // se redirecciona al LOGIN
    this.router.navigate([RouterConstant.NAVIGATE_LOGIN]);
  }

  /**
   * Metodo que soporta el evento click del boton permanecer del modal timeout
   */
  public permanecer(): void {
    this.modalTimeOut.closeModal();
  }

  /**
   * Metodo que soporta el evento click del boton salir del modal timeout
   */
  public salir(): void {
    this.cerrarSesion();
    this.modalTimeOut.closeModal();
  }



  /**
   * Metodo que permite configurar el timeOut cuando
   * existe una autenticacion en el session store
   */
 


  /**
   * Método que permite verificar si la programación del vendedor aún está activa
   */
 
 


}
