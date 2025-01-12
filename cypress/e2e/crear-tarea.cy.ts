describe('Prueba E2E para Login y Crear Tarea', () => {
  
    // Paso 1: Autenticarse como usuario
    before(() => {
      // Realizar login mediante la interfaz de usuario
      cy.visit('http://localhost:4200/#/login'); // Cambia la URL si es necesario
      cy.get('#username').type('LauraPruebas');
      // Ingresa una contraseña correcta
      cy.get('#clave').type('123456');
      cy.get('button[type="submit"]').click(); // Enviar el formulario de login
    });
  
    it('Debería crear una nueva tarea correctamente después de iniciar sesión', () => {
      // Paso 2: Navegar al panel de tareas
      cy.visit('http://localhost:4200/#/autenticado/administracion/prueba/prueba-componente'); // Cambia la URL si es necesario
  
      // Paso 3: Verificar que el login fue exitoso y la sesión está activa
      cy.url().should('include', '/prueba'); // Verifica que estás en la página de tareas
      cy.contains('Tareas por hacer').should('be.visible'); // Verifica que el título "Tareas por hacer" esté visible
  
      // Paso 4: Crear la nueva tarea
      cy.get('button[data-bs-target="#createTaskModal"]').click(); // Abre el modal de creación de tarea
  
      // Completa los campos de la tarea
      cy.get('#nombreTarea').type('Nueva Tarea');
      cy.get('#responsable').type('Prueba Cypress');
  
      // Selecciona el estado "Pendiente" (por defecto ya está seleccionado)
      cy.get('input[name="estado"][value="pendiente"]').check();
  
      // Enviar el formulario para crear la tarea
      cy.get('button[type="submit"]').click();
  
      // Paso 5: Verificar que la tarea ha sido agregada a la tabla
      cy.contains('Nueva Tarea').should('be.visible');
      cy.contains('Prueba Cypress').should('be.visible');
      cy.contains('Pendiente').should('be.visible');
    });
  
  });
  