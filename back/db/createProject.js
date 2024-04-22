import { getConnection } from './db.js';

const createProject = async (project_title, project_description) => {
    let connection;
    try {
        connection = await getConnection();
        console.log('Hola');
        const [result] = await connection.query(
            `
            INSERT INTO  projects (project_title, project_description) VALUES (?, ?)
            `,
            [project_title, project_description]
        );
        console.log('Hola2');
        return result.insertId;
    } finally {
        if (connection) connection.release();
    }
};

export { createProject };
