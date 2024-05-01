import getConnection from '../../db/getConnection.js';

export const selectCompanyForProfile = async (req, res) => {
    try {
        const { companyId } = req.body;
        const { profileId } = req.user; // Suponiendo que el ID del perfil del usuario está disponible en req.user

        const connection = await getConnection();

        // Actualizar el perfil del usuario experto con el ID de la empresa seleccionada
        await connection.query(
            'UPDATE profile SET company_id = ? WHERE profile_id = ?',
            [companyId, profileId]
        );

        res.status(200).json({
            message:
                'Empresa seleccionada correctamente para el perfil del usuario experto.',
        });
    } catch (error) {
        console.error(
            'Error al seleccionar la empresa para el perfil del usuario experto:',
            error
        );
        res.status(500).json({
            error: 'Error al seleccionar la empresa para el perfil del usuario experto.',
        });
    }
};
