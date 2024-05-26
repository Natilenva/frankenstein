import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const QuestionProfile = ({ questionProfile }) => {
    return (
        <section>
            <div className="flex gap-2 self-center mt-3.5 w-full max-w-[305px]">
                <div className="justify-center items-center px-1.5 my-auto w-8 h-8 text-xl leading-8 text-center text-white whitespace-nowrap rounded-2xl bg-white bg-opacity-10 text-ellipsis">
                    ❓
                </div>
                <Link to={`/question/${questionProfile.question_id}`}>
                    {' '}
                    {questionProfile.question_title}
                </Link>

                <p className="text-xs leading-4 text-black text-opacity-50">
                    <strong>Tecnologia:</strong> {questionProfile.technology}
                </p>

                <p className="text-xs leading-4 text-black text-opacity-50">
                    {questionProfile.question_description}
                </p>
                {/* <h3 className="text-sm leading-5 text-black underline">
                    {questionProfile.question_title}
                </h3>
                <div className="flex flex-col flex-1 px-5">
                    <Link to={`/question/${questionProfile.question_id}`}>
                        <li>
                            <div>
                                <div>
                                    <h3 className="text-sm leading-5 text-black underline">
                                        {questionProfile.question_title}
                                    </h3>

                                    <p className="text-xs leading-4 text-white text-opacity-50">
                                        <strong>Tecnologia:</strong>{' '}
                                        {questionProfile.technology}
                                    </p>

                                    <p className="text-xs leading-4 text-white text-opacity-50">
                                        {questionProfile.question_description}
                                    </p>
                                </div>
                                <div className="text-xs leading-4 text-white text-opacity-50">
                                    <time>
                                        {moment(
                                            questionProfile.createdAt
                                        ).format('DD/MM/YYYY [a las] HH:mm')}
                                    </time>
                                </div>
                            </div>
                        </li>
                    </Link>
                </div> */}
            </div>
        </section>
    );
};
QuestionProfile.propTypes = {
    questionProfile: PropTypes.any,
};
