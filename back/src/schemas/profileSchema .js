import { z } from 'zod';
const profileSchema = z.object({
    profile_name: z
        .string({
            invalid_type_error: 'Tiene que ser un string',
            required_error: 'Campo requerido',
        })
        .min(3, 'Mínimo 3 caracteres')
        .max(10, 'Máximo 30 caracteres'),

    profile_lastname: z
        .string({
            invalid_type_error: 'Tiene que ser un string',
            required_error: 'Campo requerido',
        })
        .min(3, 'Mínimo 3 caracteres')
        .max(10, 'Máximo 30 caracteres'),
    profile_username: z
        .string({
            invalid_type_error: 'Tiene que ser un string',
            required_error: 'Campo requerido',
        })
        .min(3, 'Mínimo 3 caracteres')
        .max(10, 'Máximo 30 caracteres'),
    birthdate: z.coerce.date(),
    profile_role: z.enum(['expert', 'company', 'student']),
    profile_username: z
        .string({
            invalid_type_error: 'Tiene que ser un string',
            required_error: 'Campo requerido',
        })
        .min(3, 'Mínimo 3 caracteres')
        .max(10, 'Máximo 30 caracteres'),
    company_name: z.optional(
        z
            .string({
                invalid_type_error: 'Tiene que ser un string',
            })
            .min(3, 'Mínimo 3 caracteres')
            .max(10, 'Máximo 30 caracteres')
    ),
});

export { profileSchema };
