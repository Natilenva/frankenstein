// Controlador para validar un usuario experto
import getConnection from '../../db/getConnection.js';
export const validateExpertUser = async (req, res) => {
    try {
        const { companyId, profileId } = req.params;

        // Verificar si el usuario ya ha sido validado como experto por esta empresa
        const connection = await getConnection();
        const [existingProfile] = await connection.query(
            'SELECT * FROM profile WHERE profile_id = ? AND validated_by_company_id = ?',
            [profileId, companyId]
        );

        if (existingProfile) {
            return res
                .status(400)
                .json({
                    error: 'El usuario ya ha sido validado como experto por esta empresa.',
                });
        }

        // Validar al usuario como experto para esta empresa (actualizar el campo 'validated_by_company_id' en la tabla de perfiles)
        await connection.query(
            'UPDATE profile SET validated_by_company_id = ? WHERE profile_id = ?',
            [companyId, profileId]
        );

        res.status(200).json({
            message: 'Usuario experto validado por la empresa correctamente.',
        });
    } catch (error) {
        console.error(
            'Error al validar usuario experto por la empresa:',
            error
        );
        res.status(500).json({
            error: 'Error al validar usuario experto por la empresa.',
        });
    }
};

// Controlador para rechazar un usuario experto
export const rejectExpertUser = async (req, res) => {
    try {
        const { companyId, profileId } = req.params;

        // Rechazar la validación del usuario experto para esta empresa (actualizar el campo 'validated_by_company_id' en la tabla de perfiles a NULL)
        const connection = await getConnection();
        await connection.query(
            'UPDATE profile SET validated_by_company_id = NULL WHERE profile_id = ? AND validated_by_company_id = ?',
            [profileId, companyId]
        );

        res.status(200).json({
            message:
                'Validación de usuario experto rechazada por la empresa correctamente.',
        });
    } catch (error) {
        console.error(
            'Error al rechazar la validación de usuario experto por la empresa:',
            error
        );
        res.status(500).json({
            error: 'Error al rechazar la validación de usuario experto por la empresa.',
        });
    }
};
