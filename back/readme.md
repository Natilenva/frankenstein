Frankenstein - Red Social para Programadores y Diseñadores
¡Bienvenido al Backend de Frankenstein! Frankenstein es una plataforma de red social diseñada para fomentar la colaboración, el aprendizaje y el crecimiento profesional entre creativos y desarrolladores. Su modalidad se basa en conectar, aprender y mostrar habilidades. Ofrece una variedad de herramientas y funciones diseñadas para ayudar a los usuarios a mostrar su trabajo creativo, conectarse con otros profesionales del sector, explorar oportunidades laborales y expandir su red de contactos.

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

Questions:
POST /question: Crea una nueva pregunta.
GET /question/:id: Obtiene una pregunta específica por su ID.
GET /questions: Obtiene todas las preguntas disponibles.
GET /question/:search: Busca preguntas que coincidan con el término de búsqueda.
GET /register/:register_id/question: Obtiene las preguntas asociadas a un registro específico.

Profiles:
POST /myprofile: Crea un nuevo perfil.
GET /myprofile/:profile_id: Obtiene un perfil específico por su ID.
PUT /profileupdate: Actualiza un perfil existente.

Responses:
POST /response/:questionID: Agrega una respuesta a una pregunta específica.

Companies:
POST /newcompany: Crea una nueva empresa.
GET /companynames: Obtiene los nombres de todas las empresas disponibles.

Skills:
POST /newexpertskills (user1): Agrega nuevas habilidades de experto para un usuario específico.
POST /newexpertskills (user2): Agrega nuevas habilidades de experto para otro usuario específico.
GET /expertskills: Obtiene todas las habilidades de experto disponibles.

Technologies:
GET /technologies: Obtiene información sobre todas las tecnologías disponibles.

Projects:
POST /newproject: Crea un nuevo proyecto.
GET /project/:project_id: Obtiene información detallada sobre un proyecto específico por su ID.
GET /projects: Obtiene todos los proyectos disponibles.
DELETE /project/:project_id: Elimina un proyecto específico por su ID.
PUT /Update Project: Actualiza la información de un proyecto existente.
GET /register/:register_id/project: Obtiene los proyectos asociados a un registro específico.

Register:
POST /register (user1): Registra un usuario específico.
POST /register: Registra un nuevo usuario.
GET /validate/:registrationCode: Valida un código de registro.

Login:
POST /login (user1): Inicia sesión para un usuario específico.
POST /login (user2): Inicia sesión para otro usuario específico.


Nota sobre Testing
Se proporciona un archivo frankenstein.postman_collection.json que contiene una colección de solicitudes que puedes importar en Postman para probar los endpoints de la API de Frankenstein. 

questions
POST/question
GET/question/:id
GET/questions
GET/question/:search
GET/register/:register_id/question

profiles
POST/myprofile
GET/myprofile/:profile_id
PUT/profileupdate

responses
POST/response/:questionID

companies
POST/newcompany
GET/companynames

skills
POST/newexpertskills(user1)
POST/newexpertskills(user2)
GET/expertskills

technologies
GET/technologies

projects
POST/newproject
GET/project/:project_id
GET/projects
DEL/project/:project_id
PUT/Update Project
GET/regiater/:register_id/project

register
POST register(user1)
POST/register
GET/validate/:registrationCode

login
POST login(user1)
POST/login(user2)
