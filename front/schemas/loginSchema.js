import { z } from 'zod';
const loginSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Campo obligatorio' })
        .email('No es un email válido'),
    register_password: z
        .string()
        .min(1, { message: 'Campo obligatorio' })
        .min(3, 'Mínimo 3 caracteres')
        .max(10, 'Máximo 30 caracteres'),
});

export { loginSchema };
