# ToDoList
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.11.

## Cómo ejecutar el proyecto.

ng serve

## Cómo ejecutar las pruebas.

npx cypress open

## Decisiones técnicas tomadas.

Se creará un módulo para el login del usuario.
Beneficio: Separar el login en su propio módulo ayuda a mantener el código organizado y fácil de extender. 

Se creará un módulo para guardar los componentes a los que deberá acceder el usuario solamente cuando esté autenticado, utilizando un guard.
Beneficio: Usar un guard asegura que solo los usuarios autenticados puedan acceder a ciertas partes de la aplicación. Esto mejora la seguridad y la experiencia del usuario al evitar que accedan a funcionalidades restringidas sin estar correctamente autenticados.

Se creará un componente para la funcionalidad de la gestión de las tareas en el modulo de autenticado.

Se creará otro componente en el módulo autenticado llamado "Dashboard" para el manejo del indicador de las tareas realizadas.
Beneficio: El dashboard se debe actualizar automáticamente para mejorar la experiencia del usuario al mostrar datos relevantes de forma instantánea sin necesidad de recargar la página.

Se creará un componente de bienvenida para cuando el usuario esté autenticado, donde se mostrará el menú del usuario y la opción para cerrar sesión.

Se creará un servicio llamado "TareaService" centralizado para manejar el estado de las tareas facilita la sincronización de datos entre diferentes componentes. Esto asegura que cualquier cambio en las tareas se refleje en toda la aplicación de manera consistente.

Se creará otro servicio para el módulo de login, encargado de validar el usuario y la contraseña.

Se creará un componente para la funcionalidad de las tareas, el cual permitirá crear, actualizar, eliminar, editar, cambiar el estado, y filtrar las tareas.

Este componente actualizará automáticamente el dashboard con el indicador de las tareas realizadas y pendientes. Actualizar el dashboard en tiempo real proporciona una experiencia dinámica para el usuario, permitiendo que siempre vea un estado actualizado de sus tareas sin necesidad de recargar la página. Esto mejora la interactividad y la fluidez de la aplicación.