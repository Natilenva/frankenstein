'use strict';
import 'dotenv/config';
import express from 'express';
const { PORT } = process.env;

const app = express();
app.get('/', (req, res) => {
  res.status(200).send('Hola!');
});
app.listen(PORT, () => {
  console.log(`Escuchando puerto ${PORT} 🌠`);
});
