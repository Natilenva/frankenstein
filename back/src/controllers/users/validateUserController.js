import { selectRegisterCodeModel } from '../../models/users/selectRegisterCodeModel.js';
import { updateRegistrationCodeActiveModel } from '../../models/users/updateRegistrationCodeActiveModel.js';
const validateUserController = async (req, res, next) => {
    const { registrationCode } = req.params;
    try {
        const [user] = await selectRegisterCodeModel(registrationCode);
        await updateRegistrationCodeActiveModel(user);
        return res.send(
            `<!doctype html>
    <html>
      <head>
        <link rel="stylesheet" href="stylesheets/style.css">
        <style>
        p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;}
        h1{ font-size: 30px !important;}
        h2{ font-size: 25px !important;}
        h3{ font-size: 18px !important;}
        h4{ font-size: 16px !important;}
        p, a{font-size: 15px !important;}

        .claseBoton{
            width: 30%;
                background-color: #829821;
                border: 2px solid #829821;
                color: black; 
                padding: 16px 32px;
                text-align: center;
                text-decoration: none;
                font-weight: bold;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                transition-duration: 0.4s;
                cursor: pointer;
        }
        .claseBoton:hover{
            background-color: #000000;
            color: #ffffff;
        }
        .imag{
            width: 20px;
            height: 20px;
        }
        .contA{
            margin: 0px 5px 0 5px;
        }
        .afooter{
            color: #ffffff !important; 
            text-decoration: none;
            font-size: 13px !important;
        }
    </style>
      </head>
      <body>
     
    
         <div style="width: 100%; background-color: #e3e3e3;">
        <div style="padding: 20px 10px 20px 10px;">
            <!-- Imagen inicial -->
            <div style="background-color: #000000; padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
                <img src="./../../uploads/frankenstein.png" alt="Frankenstein" >
            </div>
            <!-- Imagen inicial -->

            <!-- Contenido principal -->
            <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                <h1>Usuario validado correctamente</h1>
                <p>Frankenstein es una Red Social diseñada para fomentar la colaboración, el aprendizaje y el crecimiento profesional entre creativos y desarrolladores (su modalidad es: conecta, aprende y muestra tus habilidades). Ofrece una variedad de herramientas y funciones diseñadas para ayudar a los usuarios a mostrar su trabajo creativo, conectarse con otros profesionales del sector, explorar oportunidades laborales y expandir su red de contactos.
                </p>

                <!-- Gracias -->
                <p>Gracias por tu tiempo.</p>
                <p style="margin-bottom: 50px;"><i>Atentamente:</i><br>Equipo Frankenstein</p>

                <!-- Botón -->
                <a class="claseBoton" href="http://localhost:5173/login">Loguéate</a>
            </div>
            <!-- Contenido principal -->

            <!-- Footer -->
            <div style="background-color: #282828; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
 

                <h4>Soporte</h4>
                <p style="font-size: 13px; padding: 0px 20px 0px 20px;">
                    Comunícate con nosotros por los siguientes medios:<br>
                    Correo: <a class="afooter" href="mailto:frankensteinhack2024@gmail.com">frankensteinhack2024@gmail.com</a><br>
                    
                </p>
                <p style="background-color: black; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                    © 2024 Frankenstein, todos los derechos reservados.
                </p>
            </div>
            <!-- Footer -->



        </div>
    </div>
      </body>
    </html>`
        );
    } catch (error) {
        next(error);
    }
};
export { validateUserController };
