import PropType from 'prop-types';
import { Link } from 'react-router-dom';

export const QuestionCard = ({ question }) => {
    {
        /* NO USAR truncateTextPalabras pq puede hacer q la Card se vea más corta o más larga en comparación a otras Card */
    }

    // Función para limitar el número de palabras y añadir puntos suspensivos
    /* const truncateTextPalabras = (text, limit) => {
        const words = text.split(' ');
        if (words.length > limit) {
            return words.slice(0, limit).join(' ') + '...';
        }
        return text;
    }; */

    // Función para limitar el número de caracteres y añadir puntos suspensivos
    const truncateTextCaracteres = (text, limit) => {
        if (text.length > limit) {
            return text.slice(0, limit) + '...';
        }
        return text;
    };

    return (
        <article className="flex bg-neutral-950 ">
            {' '}
            {/* p-4 gap-4  */}
            <div>{/* ❓ */}</div>
            <Link to={`/question/${question.question_id}`}>
                <div>
                    <p className="text-xs font-normal mt-1 text-neutral-500">
                        Tecnologia: {question.technology}
                    </p>
                    <h1 className=" text-base mt-1 font-medium leading-tight text-white">
                        {' '}
                        {question.question_title}
                        {/* ❓ */}
                    </h1>
                    <p className="text-sm font-light mt-2 text-neutral-200">
                        {truncateTextCaracteres(
                            question.question_description,
                            55
                        )}{' '}
                        {/* Limitar a 100 caracteres */}
                        {/* NO USAR el truncateTextPalabras pq puede hacer q la Card se estire o acorte*/}
                        {/* {truncateTextPalabras(project.project_description, 20)} {/* Limitar a 20 palabras */}
                        <time className="text-xs font-normal mt-1 text-neutral-500">
                            {' '}
                            {new Date(question.created_at).toLocaleDateString()}
                        </time>
                    </p>
                </div>
            </Link>
        </article>
    );
};
QuestionCard.propTypes = {
    question: PropType.object.isRequired,
};
