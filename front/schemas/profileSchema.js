import { z } from 'zod';
const profileSchema = z
    .object({
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
        company_name: z.string().optional().nullable(),
    })
    .refine(
        (data) =>
            data.profile_role !== 'company' ||
            (data.profile_role === 'company' && data.company_name),
        {
            message:
                'El nombre de la empresa es obligatorio cuando el rol es empresa',
            path: ['company_name'],
        }
    );

export default profileSchema;
