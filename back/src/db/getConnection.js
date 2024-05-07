import mysql from 'mysql2/promise';
import 'dotenv/config';
import { generateError } from '../helpers/generateError.js';

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

let pool;

const getConnection = async () => {
    try {
        if (!pool) {
            pool = await mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASSWORD,
            });

            await pool.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`);

            pool = await mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASSWORD,
                database: MYSQL_DATABASE,
                timezone: 'Z',
            });
        }
        return pool;
    } catch (err) {
        console.error(err);
        throw generateError(`Conexión fallida ${err.message}`, 502);
    }
};
export default getConnection;
