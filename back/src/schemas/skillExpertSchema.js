import { z } from 'zod';

const skillExpertSchema = z.object({
    idSkill: z.number({
        invalid_type_error: 'Tiene que ser un Numero',
        required_error: 'Campo requerido, identificador de skill',
    }),
    expertUserId: z.number({
        invalid_type_error: 'Tiene que ser un Numero',
        required_error: 'Campo requerido, identificador del usuario',
    }),
});
export { skillExpertSchema };
