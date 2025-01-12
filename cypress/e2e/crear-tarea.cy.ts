describe('Prueba E2E para Login y Crear Tarea', () => {
  
    before(() => {
      cy.visit('http://localhost:4200/#/login');
      cy.get('#username').type('LauraPruebas');
      cy.get('#clave').type('123456');
      cy.get('button[type="submit"]').click();
    });
  
    it('Debería crear una nueva tarea correctamente después de iniciar sesión', () => {
      cy.visit('http://localhost:4200/#/autenticado/administracion/prueba/prueba-componente');
      cy.url().should('include', '/prueba');
      cy.contains('Tareas por hacer').should('be.visible');
  
      cy.get('button[data-bs-target="#createTaskModal"]').click();
      cy.get('#nombreTarea').type('Nueva Tarea');
      cy.get('#responsable').type('Prueba Cypress');
      cy.get('input[name="estado"][value="pendiente"]').check();
      cy.get('button[type="submit"]').click();
  
      cy.contains('Nueva Tarea').should('be.visible');
      cy.contains('Prueba Cypress').should('be.visible');
      cy.contains('Pendiente').should('be.visible');
    });
  
});
