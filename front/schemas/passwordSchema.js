import { z } from 'zod';
const passwordSchema = z.object({
    password: z
        .string()
        .min(1, 'Campo requerido')
        .min(3, 'Mínimo 3 caracteres')
        .max(16, 'Máximo 16 caracteres'),
});
export { passwordSchema };
