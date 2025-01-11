/**
 * DTO para encapsular los datos personales del usuario para la autenticacion
 */
export class UsuarioDTO {

  /** identificador del Usuario */
  public idUsuario?: number;

  /**Usuario */
  public usuario?: string;

  /** Es el nombre completo del usuario */
  public nombreCompleto?: string;

  /** Son los nombres de los roles asignados al usuario */
  public roles?: string;

  /** Son los identificadores de cada rol que tiene el usuario */
  public idRoles?: string;

  /** Identifica si es el primer ingreso en el sistema */
  public primerIngreso?: number;

  /** Indica si el usuario autenticado tiene rol de administrador */
  public administrador?: boolean;

  /** Oficina a la que está asociado el usuario */
  public idOficina?: number;

  /** Punto de venta al que está asociado el usuario*/
  public idPuntoVenta?: number;

  /** Almacena la hora final de programación*/
  public horaFinal?: string;

  /** Almacena el monto del usuario atenticado */
  public montoPremio?: number;

  /** Almacena la variable que indica si es cajero el usuario */
  public isCajero?: boolean;

  /** Caja al que está asociado el usuario*/
  public idCaja?: number;

  /** Almacena el identificador de plan de comision*/
  public idPlanComision?: number;

  /** identificador de la  zona a la que pertenece el usuario */
  public  idZona?: number;
	
	/** identificador de la sub zona a la que pertenece el usuario */
	public idSubZona?: number;

  /** Identifica si el rol tiene programacion o no */
  public rolConProgramacion?: boolean; 
}
