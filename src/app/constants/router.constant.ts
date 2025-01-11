/**
 * Clase constante que contiene todo los ROUTER del app
 */
export class RouterConstant {

  /** Router para el modulo del LOGIN */
  public static readonly ROUTER_LOGIN: string = 'login';

  /** Router para el modulo del PAGINAS DE ERRORES */
  public static readonly ROUTER_ERROR: string = 'error';

  /** Router para la pagina de error cuando el usuario no tiene permisos */
  public static readonly ROUTER_DENEGADO: string = 'denegado';

  /** Router que se utiliza cuando el user esta autenticado */
  public static readonly ROUTER_AUTENTICADO: string = 'autenticado';

  /** Router para la pagina BIENVENIDA */
  public static readonly ROUTER_BIENVENIDA: string = 'bienvenida';

  /** Router para el modulo ADMINISTRATIVO */
  public static readonly ROUTER_ADMINISTRACION: string = 'administracion';

  /** Constante para navegar al modulo de LOGIN */
  public static readonly NAVIGATE_LOGIN: string = `/${RouterConstant.ROUTER_LOGIN}`;

  /** Constante para navegar a la pagina de PERMISOS DENEGADO */
  public static readonly NAVIGATE_DENEGADO: string = `/${RouterConstant.ROUTER_ERROR}/${RouterConstant.ROUTER_DENEGADO}`;

  /** Constante para navegar a la pagina de BIENVENIDA */
  public static readonly NAVIGATE_BIENVENIDA: string = `/${RouterConstant.ROUTER_AUTENTICADO}/${RouterConstant.ROUTER_BIENVENIDA}`;
}
