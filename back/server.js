'use strict';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import cors from 'cors';

app.use(morgan('dev'));
app.use(express.json());
app.use(fileUpload());
app.use('/uploads', express.static('./uploads'));
app.use(cors());
const app = express();

const { PORT } = process.env;

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
    console.log(`Escuchando puerto ${PORT} 🌠`);
});
