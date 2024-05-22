import { selectUserForContextById } from '../../models/users/selectUserForContextById.js';
const getMeController = async (req, res, next) => {
    try {
        //const user = await selectUserForContextById(req.userId, false);
        const user = await selectUserForContextById(req.userId);
        //console.log('getMeController, user: ', user);

        const { register_id, email, usernameOfRegister, created_at } = user;

        res.send({
            status: 'ok',
            /* data: user, */
            data: {
                register_id, 
                email,
                usernameOfRegister,
                created_at
            }
        });
    } catch (error) {
        next(error);
    }
};
export { getMeController };
