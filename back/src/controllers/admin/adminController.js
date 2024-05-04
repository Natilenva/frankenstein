import bcrypt from 'bcrypt';
import getConnection from '../../db/getConnection.js';

const createAdmin = async (req, res, next) => {
    try {
        // Obtener datos de la solicitud
        const {
            email,
            password,
            registerCode,
            adminName,
            adminLastName,
            adminUserName,
        } = req.body;

        // Validar los datos (puedes agregar más validaciones según sea necesario)

        // Crear hash de la contraseña
        const register_password = await bcrypt.hash(password, 10);

        // Crear conexión a la base de datos
        const connection = await getConnection();

        // Insertar el nuevo administrador en la base de datos
        await connection.query(
            'INSERT INTO user_admin (email, register_password, register_code, admin_name, admin_lastname, admin_username) VALUES (?, ?, ?, ?, ?, ?)',
            [
                email,
                register_password,
                'TEST',
                adminName,
                adminLastName,
                adminUserName,
            ]
        );

        // Responder con éxito
        res.status(201).json({ message: 'Administrador creado exitosamente' });
    } catch (error) {
        console.error('Error al crear administrador:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const getAdmin = async (req, res, next) => {
    try {
        const skillsDistinct = await selectDistinctSkillsModel();

        res.status(200).send({
            status: 'ok',
            message: 'Skills in dt ExpertSkillsV1',
            skills: skillsDistinct,
        });
    } catch (err) {
        next(err);
    }
};
const updateAdmin = async (req, res, next) => {
    try {
        const skillsDistinct = await selectDistinctSkillsModel();

        res.status(200).send({
            status: 'ok',
            message: 'Skills in dt ExpertSkillsV1',
            skills: skillsDistinct,
        });
    } catch (err) {
        next(err);
    }
};
const deleteAdmin = async (req, res, next) => {
    try {
        const skillsDistinct = await selectDistinctSkillsModel();

        res.status(200).send({
            status: 'ok',
            message: 'Skills in dt ExpertSkillsV1',
            skills: skillsDistinct,
        });
    } catch (err) {
        next(err);
    }
};
export { createAdmin, getAdmin, updateAdmin, deleteAdmin };
