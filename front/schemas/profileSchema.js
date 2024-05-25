import { z } from 'zod';
const profileSchema = z.object({
    profile_name: z
        .string()
        .min(1, { message: 'Campo obligatorio' })
        .min(3, 'Mínimo 3 caracteres')
        .max(15, 'Máximo 15 caracteres'),
    profile_lastname: z
        .string()
        .min(1, { message: 'Campo obligatorio' })
        .min(3, 'Mínimo 3 caracteres')
        .max(30, 'Máximo 30 caracteres'),
    profile_username: z.optional(
        z
            .string()
            .min(1, { message: 'Campo obligatorio' })
            .min(3, 'Mínimo 3 caracteres')
            .max(15, 'Máximo 15 caracteres')
    ),
    profile_role: z.enum(['expert', 'company', 'student'], {
        message: 'Tienes que escoger un rol entre las tres opciones',
    }),
    birthdate: z.optional(z.coerce.date()),

    //     {
    //         message:
    //             'Formato de fecha incorrecto. Por favor, introduce la fecha en el formato dd-mm-yyyy.',
    //     }),
    company_name: z.optional(
        z.string({
            invalid_type_error: 'Tiene que ser un string',
        })
    ),
});

export { profileSchema };
