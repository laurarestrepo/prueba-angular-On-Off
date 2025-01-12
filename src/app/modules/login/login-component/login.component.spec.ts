import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { ShellState } from '../../../states/shell/shell.state';
import { AutenticacionRequestDTO } from '../../../dtos/seguridad/autenticacion/autenticacion-request.dto';
import { SessionStoreUtil } from '../../../utils/session-store.util';
import { NO_ERRORS_SCHEMA } from '@angular/core';

// Mock de AuthService
class AuthServiceMock {
  login() {
    return of(true); // Simula una respuesta exitosa
  }
}

// Mock de ShellState
class ShellStateMock {
  iniciarSesion() {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: AuthServiceMock;
  let messageServiceMock: jasmine.SpyObj<MessageService>;
  let shellStateMock: ShellStateMock;

  beforeEach(async () => {
    authServiceMock = new AuthServiceMock();
    messageServiceMock = jasmine.createSpyObj('MessageService', ['add']);
    shellStateMock = new ShellStateMock();

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: MessageService, useValue: messageServiceMock },
        { provide: ShellState, useValue: shellStateMock }
      ],
      schemas: [NO_ERRORS_SCHEMA], // Evita errores relacionados con componentes no declarados
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login credentials', () => {
    expect(component.credenciales).toBeDefined();
  });

  it('should call login method and succeed when credentials are valid', () => {
    const validCredentials: AutenticacionRequestDTO = {
      usuarioIngreso: '10101012',
      claveIngreso: 'password'
    };

    component.credenciales = validCredentials;

    // Simula el comportamiento de un login exitoso
    spyOn(authServiceMock, 'login').and.returnValue(of(true)); // Simula autenticación exitosa

    component.iniciarSesion();

    // Verifica que el login fue llamado
    expect(authServiceMock.login).toHaveBeenCalledWith(validCredentials.usuarioIngreso, validCredentials.claveIngreso);
    
    // Verifica que no se muestra mensaje de error
    expect(messageServiceMock.add).not.toHaveBeenCalled();
  });

  it('should show error message if login fails', () => {
    const invalidCredentials: AutenticacionRequestDTO = {
      usuarioIngreso: 'wrongUser',
      claveIngreso: 'wrongPassword'
    };

    component.credenciales = invalidCredentials;

    // Simula el comportamiento de un login fallido
    spyOn(authServiceMock, 'login').and.returnValue(of(false)); // Simula autenticación fallida

    component.iniciarSesion();

    // Verifica que el mensaje de error es mostrado
    expect(messageServiceMock.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Correo electrónico o contraseña incorrectos.'
    });
  });

  it('should call iniciarSesion method when valid credentials are provided', () => {
    const validCredentials: AutenticacionRequestDTO = {
      usuarioIngreso: 'validUser',
      claveIngreso: 'validPassword'
    };

    component.credenciales = validCredentials;

    // Simula la autenticación exitosa
    spyOn(authServiceMock, 'login').and.returnValue(of(true));
    spyOn(shellStateMock, 'iniciarSesion');

    component.iniciarSesion();

    // Verifica que el método iniciarSesion haya sido llamado en shellState
    expect(shellStateMock.iniciarSesion).toHaveBeenCalled();
  });

  it('should call SessionStoreUtil.totalesTateas when login is successful', () => {
    spyOn(SessionStoreUtil, 'totalesTateas');

    // Simula autenticación exitosa
    spyOn(authServiceMock, 'login').and.returnValue(of(true));
    
    component.iniciarSesion();

    // Verifica que el método totalesTateas haya sido llamado
    expect(SessionStoreUtil.totalesTateas).toHaveBeenCalledWith('SET', component.tareas);
  });

  it('should initialize credenciales as an empty object on init', () => {
    expect(component.credenciales).toBeTruthy();
    expect(component.credenciales.usuarioIngreso).toBeUndefined();
    expect(component.credenciales.claveIngreso).toBeUndefined();
  });
});
