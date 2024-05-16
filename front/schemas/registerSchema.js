import { z } from 'zod';
const registerSchema = z.object({
    email: z.string().min(1, 'Cammpo requerido').email('Email no válido'),
    password: z
        .string()
        .min(1, 'Campo requerido')
        .min(3, 'Mínimo 3 caracteres')
        .max(16, 'Máximo 16 caracteres'),
});
export { registerSchema };
