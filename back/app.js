import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import router from './src/routes/index.js';
import { userRouter } from './src/routes/userRouter.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(fileUpload());
app.use('/uploads', express.static('./uploads'));
app.use(cors());

const { PORT } = process.env;
// app.use(router);

app.use('/users', userRouter);

app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found',
    });
});
app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.httpStatus || 500).send({
        status: 'error',
        message: error.message,
    });
});
app.listen(PORT, () => {
    console.log(`Escuchando puerto http://localhost:${PORT} 🌠`);
});
