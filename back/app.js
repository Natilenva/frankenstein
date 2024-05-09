import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import routes from './src/routes/index.js';

const { PORT } = process.env;

const app = express();

app.use(express.json());

app.use(fileUpload());

app.use(cors());
/* app.use(cors({
    exposedHeaders: ['Authorization']
  })); */

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.use('/uploads', express.static('./uploads'));
app.use(express.static('./uploads'));
app.use(express.static('./public'));
app.use(routes);

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
