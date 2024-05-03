// Controlador para validar un usuario experto
import { isValid } from 'zod';
import getConnection from '../../db/getConnection.js';
export const validateExpertUser = async (req, res) => {
    console.log('Entro');
    try {
        const { companyId, profileId } = req.body;

        let query = 'SELECT * FROM frankenstein.profile as prof ';
        query +=
            'inner join frankenstein.companies as comp on (prof.register_id = comp.register_id) ';
        query += 'where prof.profile_id = ? and comp.company_id = ? ;';
        console.log('query: ' + query);

        // Verifica si el usuario esta asociado a una empresa
        const connection = await getConnection();
        const [existingProfile] = await connection.query(
            //'SELECT * FROM profile WHERE profile_id = ? AND company_id = ?',
            query,
            [profileId, companyId]
        );

        if (existingProfile.length > 0) {
            const [updateProfile] = await connection.query(
                //'SELECT * FROM profile WHERE profile_id = ? AND company_id = ?',
                'update frankenstein.profile set validate = 1 where profile_id = ?;',
                [profileId]
            );
            console.log('se actualiza profile: ' + updateProfile.length);
            return res.status(201).json({
                result: 'El usuario ha sido validado como experto correctamente.',
            });
        }

        // Validar al usuario como experto para esta empresa (actualizar el campo 'validated_by_company_id' en la tabla de perfiles)
        await connection.query(
            'UPDATE profile SET company_id = ? WHERE profile_id = ?',
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

// Controlador que consulta si un usuario es experto
export const isValidateExpertUser = async (req, res) => {
    try {
        const { companyId, profileId } = req.params;
        console.log('Entro companyId' + companyId);
        console.log('Entro profileId' + profileId);

        // Consulta si un perfil esta asociado a una empresa y es validado como experto
        const connection = await getConnection();
        let query = 'SELECT * FROM frankenstein.profile as prof ';
        query +=
            'inner join frankenstein.companies as comp on (prof.register_id = comp.register_id) ';
        query +=
            'where prof.profile_id = ? and comp.company_id = ? and prof.validate = 1;';
        console.log('query: ' + query);
        const [existingProfile] = await connection.query(
            //            'SELECT * FROM profile WHERE profile_id = ? AND company_id = ?',
            //'SELECT prof.validate FROM frankenstein.profile as prof inner join frankenstein.companies as comp on (prof.register_id = comp.register_id) where prof.profile_id = ? and comp.company_id = ? and prof.validate = 1;',
            query,
            [profileId, companyId]
        );
        //const { validate } = existingProfile;
        console.log('existingProfile: ' + existingProfile.length);
        if (existingProfile.length > 0) {
            console.log('existingProfile: ' + existingProfile[0]);
            return res.status(200).json({
                isValid: true,
                result: 'El usuario ya ha sido validado como experto por esta empresa.',
            });
        } else {
            return res.status(200).json({
                isValid: false,
                result: 'El usuario no ha sido validado como experto por esta empresa.',
            });
        }

        // Validar al usuario como experto para esta empresa (actualizar el campo 'validated_by_company_id' en la tabla de perfiles)
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
    console.log('Entro');
    try {
        const { companyId, profileId } = req.body;

        let query = 'SELECT * FROM frankenstein.profile as prof ';
        query +=
            'inner join frankenstein.companies as comp on (prof.register_id = comp.register_id) ';
        query += 'where prof.profile_id = ? and comp.company_id = ? ;';
        console.log('query: ' + query);

        // Verifica si el usuario esta asociado a una empresa
        const connection = await getConnection();
        const [existingProfile] = await connection.query(
            //'SELECT * FROM profile WHERE profile_id = ? AND company_id = ?',
            query,
            [profileId, companyId]
        );

        if (existingProfile.length > 0) {
            const [updateProfile] = await connection.query(
                //'SELECT * FROM profile WHERE profile_id = ? AND company_id = ?',
                'update frankenstein.profile set validate = 0 where profile_id = ?;',
                [profileId]
            );
            console.log('se actualiza profile: ' + updateProfile.length);
            return res.status(201).json({
                result: 'El usuario ha sido rechazado como experto.',
            });
        }

        // Validar al usuario como experto para esta empresa (actualizar el campo 'company_id' en la tabla de perfiles)
        /* await connection.query(
            'UPDATE profile SET company_id = ? WHERE profile_id = ?',
            [companyId, profileId]
        ); */

        /* res.status(200).json({
            message: 'Usuario experto validado por la empresa correctamente.',
        }); */
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
