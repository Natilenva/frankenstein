import { z } from 'zod';

const responseSchema = z.object({
    response_text: z
        .string()
        .min(1, { message: 'Campo obligatorio' })
        .min(3, 'Mínimo 3 caracteres')
        .max(200, 'Máximo 200 caracteres'),
});
export { responseSchema };
