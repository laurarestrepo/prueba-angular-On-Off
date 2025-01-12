import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Simulamos la validación del email y la contraseña
  login(email: string, password: string): Observable<boolean> {
    const mockEmail = 'LauraPruebas';
    const mockPassword = '123456';

    if (email === mockEmail && password === mockPassword) {
      return of(true); // Login exitoso
    } else {
      return of(false); // Login fallido
    }
  }
}
