import { Component, OnInit } from "@angular/core";
import { ShellState } from "../../../states/shell/shell.state";
import { AuthService } from "../../../services/auth.service";
import { MessageService } from "primeng/api";
import { AutenticacionRequestDTO } from "../../../dtos/seguridad/autenticacion/autenticacion-request.dto";

/**
 * Componente para la autenticacion del sistema ADMIN
 */
@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  /** Se utiliza para capturar las credenciales del usuario */
  public credenciales!: AutenticacionRequestDTO;

  /** Contiene el mensaje de error presentada en la autenticacion */
  public msjError: string = "";
  private json: string = JSON.stringify({
    usuario: {
      idUsuario: 1069,
      usuario: "10101012",
      nombreCompleto: "Usuario conectado ",
      clave: "$2a$10$Ez9PhFiygHdYV/rWu6Dhf.feuK5flp8b1ax8uaVOtbalih9bSGQni",
    },
  });
  private menu: string = JSON.stringify([
    {
      id: "1",
      label: "Módulos",
      title:
        "Menú principal que contiene los procesos del negocio del módulo administrativo",
      icon: "fa-cog",
      routerLink: null,
      expanded: true,
      items: [
        {
          id: "67",
          label: "Gestión de Tareas",
          title: "Gestión de Tareas",
          icon: "",
          routerLink:
            "/autenticado/administracion/prueba/prueba-componente",
          expanded: false,
        },
      ],
    },
  ]);
  /**
   * @param shellState, se utiliza para notificar el inicio de sesion
   */
  constructor(protected shellState: ShellState, private authService: AuthService, protected messageService: MessageService) {
  }

  /**
   * Aca se debe inicializar las variables globales del LOGIN
   */
  ngOnInit() {
    this.init();
  }

  /**
   * Metodo que soporta el evento click del boton iniciar sesion
   */
  public iniciarSesion(): void {
    if (
      this.credenciales &&
      this.credenciales.claveIngreso &&
      this.credenciales.usuarioIngreso
    ) {
      this.authService.login(this.credenciales.usuarioIngreso, this.credenciales.claveIngreso).subscribe(isAuthenticated => {
        if (isAuthenticated) {
          this.credenciales.nombreCompleto= "Laura Rodriguez Restrepo"
          this.shellState.iniciarSesion(JSON.parse(this.menu), this.credenciales);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Correo electrónico o contraseña incorrectos.' });
        }
      });



    }
  }

  /**
   * Metodo que es ejecutado antes de invocar el metodo iniciar sesion
   */
  public beforeIniciarSesion(): boolean {


    return true;
  }

  /**
   * Metodo que permite inicializar las variables globales
   */
  private init(): void {
    this.credenciales = new AutenticacionRequestDTO();;
  }

}
