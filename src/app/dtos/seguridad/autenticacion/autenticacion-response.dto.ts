import { UsuarioDTO } from './usuario.dto';

/**
 * DTO para encapsular los datos que se envía cuando inician sesión ante al sistema
 */
export class AutenticacionResponseDTO {

    /** son los datos del usuario autenticado */
    public usuario: UsuarioDTO;

	/** Es el identificador de la empresa a gestionar */
	public idEmpresaGestionar: number;

}
