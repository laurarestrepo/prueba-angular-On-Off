import { MenuItem } from 'primeng/api';
import { MenuItemAccionDTO } from './menu-item-accion.dto';

/**
 * DTO para encapsular los datos de un item del menu
 */
export interface MenuItemDTO extends MenuItem {

    /** son las acciones que tiene este item */
    acciones: Array<MenuItemAccionDTO>;

    /** Variable que almacena la url correspondiente al manual en pdf */
    urlManualPDF: string;

    /** Variable que almacena la url correspondiente al manual en video */
    urlManualVideo: string;
}
