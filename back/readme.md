Frankenstein - Red Social para Programadores y Diseñadores
Frankenstein es una plataforma de red social diseñada para fomentar la colaboración, el aprendizaje y el crecimiento profesional entre creativos y desarrolladores. Su modalidad se basa en conectar, aprender y mostrar habilidades. Ofrece una variedad de herramientas y funciones diseñadas para ayudar a los usuarios a mostrar su trabajo creativo, conectarse con otros profesionales del sector, explorar oportunidades laborales y expandir su red de contactos.

1.Clonar el Repositorio: Clona el repositorio de Frankenstein desde GitHub.
git clone https://github.com/tu_usuario/frankenstein.git

2.Instalar Dependencias: Navega hasta el directorio del proyecto y ejecuta el siguiente comando para instalar todas las dependencias necesarias.
cd frankenstein
cd back
npm install

3.Configurar Variables de Entorno: Es necesario crear un archivo .env basado en .env.example para configurar las variables de entorno.Crea el archivo .env en el directorio raíz del proyecto y configura las variables de entorno necesarias, como la conexión a la base de datos.

MYSQL_HOST=localhost
MYSQL_USER=usuario
MYSQL_PASSWORD=contraseña
MYSQL_DATABASE=base_de_datos

4.Crear las Tablas en la Base de Datos.
npm run initDb

5.Iniciar el Servidor: Una vez configuradas las variables de entorno, puedes iniciar el servidor ejecutando el siguiente comando:
npm run dev

Endpoints
A continuación se muestra el listado de los endpoints disponibles en la API de Frankenstein:

POST /registro: Registro de usuarios.
POST /validacion-usuario: Validación de usuario.
POST /login: Inicio de sesión de usuarios.
POST /recuperacion-contraseña: Recuperación de contraseña.
POST /cambio-contraseña: Cambio de contraseña.
GET /empresas: Listado de empresas.
GET /tipologias-consultas: Listado de tipologías de consultas.
GET /habilidades-tecnologias: Listado de habilidades/tecnologías.
POST /perfil: Gestión de perfil (experto y estudiante).
POST /proyectos: Creación de proyectos.
PUT /proyectos/:id: Modificación de proyectos.
DELETE /proyectos/:id: Eliminación de proyectos.
GET /expertos: Listado de expertos según habilidades/tecnologías.
POST /consulta-tecnica: Creación de consulta técnica.
DELETE /consulta-tecnica/:id: Eliminación de consulta (solo si no tiene respuestas).
POST /responder-consulta/:id: Respuesta a una consulta.
DELETE /eliminar-respuesta/:id: Eliminación de respuesta (si no ha sido valorada).
POST /valorar-respuesta/:id: Valoración de una respuesta de un experto (1-5).
GET /consultas: Listado de consultas con filtro/búsqueda y ordenación.
GET /consulta/:id: Detalle de una consulta.


Nota sobre Testing
Se proporciona un archivo frankenstein.postman_collection.json que contiene una colección de solicitudes que puedes importar en Postman para probar los endpoints de la API de Frankenstein. 

POST Register
POST Login
POST InsertProfile
PUT update Profile
GET Get profile
POST Add New Question
GET Get Question
GET filtro-question
POST Add New Project
PUT Update Project 
GET Project
GET Questions by registerId
GET Project by registerId
DEL Delete Project
En costrucción...