Frontend de Frankenstein - Red Social para Programadores y Diseñadores
¡Bienvenido al frontend de Frankenstein! Esta parte del proyecto se enfoca en proporcionar una interfaz de usuario intuitiva y eficiente para interactuar con la plataforma de red social diseñada para creativos y desarrolladores. A continuación, encontrarás instrucciones sobre cómo configurar y ejecutar el frontend, así como una descripción detallada de las funcionalidades implementadas.

Instrucciones de Configuración
Sigue estos pasos para configurar y ejecutar el frontend de Frankenstein:

1.Clonar el Repositorio: Clona el repositorio de Frankenstein desde GitHub.
git clone https://github.com/tu_usuario/frankenstein.git

2.Instalación de React: Si aún no tienes React instalado, puedes instalarlo globalmente utilizando npm.
npm install -g create-react-app

3.Instalación de Tailwind CSS: Tailwind CSS es una herramienta útil para el desarrollo de estilos en el frontend. Instálalo utilizando npm.
npm install tailwindcss

4.Instalar Dependencias: Navega hasta el directorio del proyecto y ejecuta el siguiente comando para instalar todas las dependencias necesarias, incluyendo las dependencias de React.
cd frankenstein
cd front
npm install

5.Configurar Variables de Entorno: No se requieren variables de entorno específicas en el frontend, pero asegúrate de que el backend esté correctamente configurado según las instrucciones proporcionadas.

6.Iniciar el Servidor de Desarrollo: Una vez instaladas las dependencias, puedes iniciar el servidor de desarrollo ejecutando el siguiente comando:
npm run dev

7.Acceder a la Aplicación: Abre tu navegador web y accede a la aplicación en la dirección http://localhost:3000.

Funcionalidades Implementadas
-Creación de proyecto de React con Vite y estructura inicial de carpetas: El proyecto se ha creado utilizando React con Vite como herramienta de construcción, y se ha establecido una estructura inicial de carpetas para organizar el código.

-Creación de páginas y rutas con React Router: Se han creado componentes de página para cada vista de la aplicación y se han definido rutas utilizando React Router para permitir la navegación entre ellas.

-Formulario de registro: Implementación de un formulario de registro de usuario que envía los datos al backend y muestra mensajes de error en caso de fallo.

-Página de validación de usuario: Página para verificar la validez de la cuenta de usuario después del registro.
Contexto para guardar la información del usuario logueado y su token: Se ha creado un contexto de autenticación para almacenar la información del usuario logueado y su token de sesión.

-Formulario de inicio de sesión: Implementación de un formulario de inicio de sesión que guarda el token y la información del usuario en el contexto de autenticación.

-Formulario recuperación contraseña: Formulario para permitir a los usuarios solicitar la recuperación de su contraseña.

-Formulario de creación y modificación de proyectos: Implementación de formularios para crear y modificar proyectos, conectados al backend para almacenar la información.

-Testing y preparación del Sprint Review: Se han realizado pruebas unitarias y de integración para garantizar el correcto funcionamiento de las funcionalidades implementadas y se ha preparado el proyecto para su revisión en el Sprint Review.


Notas Importantes

-Validar el body de la petición con Joi en todos los endpoints (Backend): Aunque esta validación se realiza en el backend, es crucial asegurarse de que los datos enviados desde el frontend cumplan con los requisitos establecidos por el servidor.
-Feedback al usuario de los errores que devuelve la API: La interfaz de usuario debe proporcionar retroalimentación clara al usuario en caso de que ocurran errores durante las operaciones, ya sea mediante mensajes de texto o notificaciones visuales enn el frontend.-
-Aplicar la metodología mobile first: El diseño y la implementación de la aplicación deben seguir la metodología de desarrollo "mobile first" para garantizar una experiencia de usuario óptima en dispositivos móviles.

En construcción...