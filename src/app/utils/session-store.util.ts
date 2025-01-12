

/**
 * Clase utilitaria para la administracion del sessionstore
 */
export class SessionStoreUtil {

  /** Key que representa los datos de la autenticacion del usuario */
  private static readonly KEY_AUTENTICACION: string = 'AUTH';

  /** Key que representa los datos del Menu */
  private static readonly KEY_MENU: string = 'MENU';

  /** Key que representa las tareas para los indicadores */
  private static readonly KEY_TAREAS: string = 'TAREAS';


  /**
   * Metodo que permite administrar el DTO que contiene
   * los datos de inicio de sesion en el sistema
   */
  public static auth(evento: any, auth?: any): any {
    return this.implementarEvento(evento, this.KEY_AUTENTICACION, auth);
  }

  /**
   * Metodo que permite administrar los items del menu
   */
  public static menu(evento: any, items?: Array<any>): Array<any> {
    return this.implementarEvento(evento, this.KEY_MENU, items);
  }

    /**
   * Metodo que permite administrar los items del menu
   */
    public static totalesTateas(evento: any, items?: Array<any>): Array<any> {
      return this.implementarEvento(evento, this.KEY_TAREAS, items);
    }
  

  /**
   * Metodo que permite obtener el identificador del usuario autenticado
   */
  public static getIdCurrentUsuario(): number {

    // se inicializa como usuario no autenticado o no existente
    let idUsuario = 0;

    // se obtiene los datos de la autenticacion
    const auth = this.auth("GET");

    // la autenticacion en el sistema es requerido
    if (auth && auth.usuario && auth.usuario.idUsuario) {
      idUsuario = auth.usuario.idUsuario;
    }
    return idUsuario;
  }

  /**
   * Metodo que permite limpiar todo el session-store para ADMIN
   */
  public static cleanAll(): void {
    sessionStorage.removeItem(this.KEY_AUTENTICACION);
    sessionStorage.removeItem(this.KEY_MENU);
  }

  /**
   * Metodo que permite implementar un evento solicitado
   *
   * @param evento , indica que tipo de evento es
   * @param key , identifica el key del local-store
   * @param dataUpdate , valor actualizar en el local, es opcional
   */
  private static implementarEvento(evento: any, key: string, dataUpdate?: any): any {
    // contiene el resultado a retornar, opcional
    let resultado = null;

    // se verifica que tipo de evento es solicitado
    switch (evento) {

      // evento para OBTENER algun valor del local-store
      case "GET": {
        const value = sessionStorage.getItem(key);
        if (value) {
          resultado = JSON.parse(value);
        }
        break;
      }

      // evento para REMOVER algun valor del local-store
      case "ELIMINAR": {
        sessionStorage.removeItem(key);
        break;
      }

      // evento para SET algun valor del local-store
      case "SET": {
        sessionStorage.setItem(key, JSON.stringify(dataUpdate));
        break;
      }
    }
    return resultado;
  }

}
