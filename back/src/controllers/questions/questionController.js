import getConnection from '../../db/getConnection.js';

const questionController = async (req, res) => {
    try {
        const keyWord = req.params.id;

        const connection = await getConnection();

        const query = `
            SELECT *
            FROM questions
            WHERE question_title LIKE '%${keyWord}%'
            ORDER BY question_title ASC;
        `;

        const [data] = await connection.query(query, [keyWord]);

        res.status(200).json({
            status: 'success',
            message: 'Preguntas encontradas',
            data: data,
        });
    } catch (error) {
        console.error('Error al buscar preguntas:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al buscar preguntas',
            error: error.message,
        });
    }
};

export default questionController;
