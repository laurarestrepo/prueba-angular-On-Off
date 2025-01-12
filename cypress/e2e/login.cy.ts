describe('Prueba E2E para Login', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200/#/login');
  });

  it('Debería mostrar un mensaje de error si las credenciales son incorrectas', () => {
    cy.get('#username').type('usuario_incorrecto');
    cy.get('#clave').type('contraseña_incorrecta');
    cy.get('button[type="submit"]').click();
  });

  it('Debería redirigir al usuario a la página principal si las credenciales son correctas', () => {
    cy.get('#username').type('LauraPruebas');
    cy.get('#clave').type('123456');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/autenticado');
  });

});
