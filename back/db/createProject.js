import { getConnection } from './db.js';

const createProject = async (title, description, user_id) => {
    let connection;
    try {
        connection = await getConnection();
        console.log('Hola');
        const [result] = await connection.query(
            `
            INSERT INTO  projects (title, description, user_id) VALUES (?, ?, ?)
            `,
            [title, description, user_id]
        );
        console.log(result);
        return result.insertId;
    } finally {
        if (connection) connection.release();
    }
};

export { createProject };
