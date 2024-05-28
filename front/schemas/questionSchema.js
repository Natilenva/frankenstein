import { z } from 'zod';

const questionSchema = z.object({
    question_title: z
        .string()
        .min(3, { message: 'Mínimo 3 caracteres' })
        .max(200, { message: 'Máximo 200 caracteres' }),

    question_description: z
        .string()
        .min(3, { message: 'Mínimo 3 caracteres' })
        .max(200, { message: 'Máximo 200 caracteres' }),

    technology: z
        .string()
        .min(3, { message: 'Mínimo 3 caracteres' })
        .max(200, { message: 'Máximo 200 caracteres' }),
});
export { questionSchema };
