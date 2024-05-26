import { z } from 'zod';

const projectSchema = z.object({
    project_title: z
        .string()
        .min(1, { message: 'Campo obligatorio' })
        .min(3, 'Mínimo 3 caracteres')
        .max(100, 'Máximo 100 caracteres'),

    project_description: z
        .string()
        .min(1, { message: 'Campo obligatorio' })
        .min(3, 'Mínimo 3 caracteres')
        .max(500, 'Máximo 500 caracteres'),
    project_photo: z.any(),

    // .refine(
    //     (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.type),
    //     'Solo se aceptan los formatos jpeg, jpg, png'
    // ),

    project_url: z
        .string()
        .url({ message: 'Url no válida. Ej.http//:www.frankensrein.com' }),
});
export { projectSchema };
