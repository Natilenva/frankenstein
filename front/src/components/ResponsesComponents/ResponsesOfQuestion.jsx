import PropType from 'prop-types';

import moment from 'moment';

const ResponsesOfQuestion = ({ response }) => {
    return (
        <section>
            <ul>
                <li>
                    <strong>{response.response_text}</strong>
                </li>
                <li>
                    <strong>Votos:</strong> {response.votes}
                </li>
                <li>
                    <strong>Fecha de creación:</strong>
                    {moment(response.created_at).format(
                        'DD/MM/YYYY [a las] HH:mm'
                    )}
                </li>
            </ul>
        </section>
    );
};

ResponsesOfQuestion.propTypes = {
    response: PropType.object,
};

export default ResponsesOfQuestion;
