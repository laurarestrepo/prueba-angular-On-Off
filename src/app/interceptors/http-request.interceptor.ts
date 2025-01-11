
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { SpinnerState } from '../states/spinner.state';
import { Observable } from 'rxjs';

/**
 * Interceptor que permite configurar la seguridad y el spinner para
 * cada peticion HTTP que realiza el usuario
 */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  /**
   * @param spinnerState, se utiliza para visualizar, ocultar el spinner
   */
  constructor(private spinnerState: SpinnerState) {}

  /**
   * Metodo que permite capturar cada request del sistema,
   * para asi agregar la seguridad correspondiente a cada peticion
   * con su respectivo spinner
   *
   * @param req, es la solicitud que envia el cliente
   * @param next, es el siguiente interceptor a ejecutar, si aplica
   * @returns Observador con el request modificado
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // se configura el spinner para esta peticion
    this.spinnerState.displaySpinner();
    let contentHeader;
  
    return next.handle(req.clone({ setHeaders: contentHeader})).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.spinnerState.hideSpinner();
          }
        },
        (err: any) => {
          this.spinnerState.hideSpinner();
        }
      )
    );
  }

  /**
   * Metodo que permite crear un Header con solo el tipo de json content
   */
  private getOnlyTypeJson(): any {
    return {
      'Content-Type': 'application/json;charset=UTF-8',
    };
  }
}
