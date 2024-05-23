import { z } from 'zod';

const questionSchema = z.object({
    question_title: z
        .string()
        .min(1, { message: 'Campo obligatorio' })
        .min(3, 'Mínimo 3 caracteres')
        .max(30, 'Máximo 200 caracteres'),

    question_description: z
        .string()
        .min(1, { message: 'Campo obligatorio' })
        .min(3, 'Mínimo 3 caracteres')
        .max(30, 'Máximo 200 caracteres'),

    technology: z
        .string()
        .min(0, 'Mínimo 0 caracteres')
        .max(100, 'Máximo 100 caracteres'),
});
export { questionSchema };
