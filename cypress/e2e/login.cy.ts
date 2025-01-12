describe('Prueba E2E para Login', () => {

  beforeEach(() => {
    // Visita la página de login
    cy.visit('http://localhost:4200/#/login'); // Cambia la ruta según la ruta de tu componente
  });

  it('Debería mostrar un mensaje de error si las credenciales son incorrectas', () => {
    // Ingresa un nombre de usuario incorrecto
    cy.get('#username').type('usuario_incorrecto');

    // Ingresa una contraseña incorrecta
    cy.get('#clave').type('contraseña_incorrecta');

    // Haz clic en el botón de login
    cy.get('button[type="submit"]').click();

  
  });

  it('Debería redirigir al usuario a la página principal si las credenciales son correctas', () => {
    // Ingresa un nombre de usuario correcto
    cy.get('#username').type('LauraPruebas');

    // Ingresa una contraseña correcta
    cy.get('#clave').type('123456');

    // Haz clic en el botón de login
    cy.get('button[type="submit"]').click();

    // Verifica que el usuario es redirigido a la página principal
    cy.url().should('include', '/autenticado'); // Cambia la ruta según la página a la que debería redirigir
  });

});
