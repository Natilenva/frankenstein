import getConnection from '../../db/getConnection.js';

export const listExpertsBySkills = async (req, res) => {
    try {
        const { skills } = req.query;

        // Convertir las habilidades separadas por coma en un array
        const skillsArray = skills.split(',');

        const connection = await getConnection();

        // Consultar la base de datos para obtener expertos que tengan al menos una de las habilidades proporcionadas
        const [experts] = await connection.query(
            `SELECT * FROM profile WHERE profile_role = 'expert' AND profile_id IN (
                SELECT DISTINCT expertUserID FROM ExpertSkillsV1 WHERE skill IN (?)
            )`,
            [skillsArray]
        );

        res.status(200).json({
            message:
                'Lista de expertos según habilidades/tecnologías obtenida correctamente.',
            experts,
        });
    } catch (error) {
        console.error(
            'Error al obtener la lista de expertos según habilidades/tecnologías:',
            error
        );
        res.status(500).json({
            error: 'Error al obtener la lista de expertos según habilidades/tecnologías.',
        });
    }
};
