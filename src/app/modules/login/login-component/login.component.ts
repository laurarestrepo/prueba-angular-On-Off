import { Component, OnInit } from "@angular/core";
import { ShellState } from "../../../states/shell/shell.state";

/**
 * Componente para la autenticacion del sistema ADMIN
 */
@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [],
})
export class LoginComponent  implements OnInit {
  /** Se utiliza para capturar las credenciales del usuario */
  public credenciales: any;

  /** Contiene el mensaje de error presentada en la autenticacion */
  public msjError: string ="";
  private json: string = JSON.stringify({
    usuario: {
      idUsuario: 1069,
      usuario: "10101012",
      nombreCompleto: "Powwi usuario conectado ",
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
          label: "Prueba render",
          title: "Prueba render ",
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
  constructor(protected shellState : ShellState) {
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
    this.shellState.iniciarSesion(JSON.parse(this.menu), JSON.parse(this.json));

    // se valida la nulalidad de las credenciales
    if (
      this.credenciales &&
      this.credenciales.claveIngreso &&
      this.credenciales.usuarioIngreso
    ) {
     alert("ok")
      // se procede a iniciar sesion en el sistema
      this.shellState.iniciarSesion(JSON.parse(this.menu), JSON.parse(this.json));
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
    this.credenciales = null;
  }

}
