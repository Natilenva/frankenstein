import jwt from 'jsonwebtoken';

const {SECRET}= process.env;

const authUserOptionalController= async(req, res, next)=>{
    try {
        const {authorization}= req.headers;

        if(authorization){
            let token;
            try {
                token= jwt.verify(authorization, SECRET);
                req.user= token;
            } catch (err) {
                console.error(err)
            }
        }
        next()
        
    } catch (err) {
        next(err)
    }
};

export default authUserOptionalController;