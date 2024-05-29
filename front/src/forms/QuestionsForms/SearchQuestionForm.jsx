import PropType from 'prop-types';

import { Link } from 'react-router-dom';

import { useState } from 'react';

const SearchForm = ({ setSearchParams, loading }) => {
    const [question_title, setQuestion_title] = useState('');
    const [technology, setTechnology] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        setSearchParams(
            new URLSearchParams({
                question_title,
                technology,
            })
        );
    };

    return (
        <main className="flex-grow">
            <div className="flex flex-col items-center justify-center m-auto md:px-6 lg:px-8">
                <div className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl text-center text-black font-semibold m-8">
                    Buscador de consultas
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-xs md:max-w-sm lg:max-w-md"
                >
                    <div>
                        <label htmlFor="question_title" className="block mb-4">
                            Titulo:
                        </label>
                        <input
                            className="w-full px-3 py-2 bg-white rounded-md border border-solid border-zinc-200 text-neutral-700"
                            type="text"
                            id="question_title"
                            value={question_title}
                            onChange={(e) => setQuestion_title(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="technology" className="block mb-1">
                            Tecnologia:
                        </label>
                        <input
                            className="w-full px-3 py-2 bg-white rounded-md border border-solid border-zinc-200 text-neutral-700"
                            type="text"
                            id="technology"
                            value={technology}
                            onChange={(e) => setTechnology(e.target.value)}
                        />
                    </div>
                    <div className=" flex space-x-4 place-content-around">
                        <button
                            className=" w-[50%]  px-4 py-2 text-sm font-medium text-white bg-frankgreen border border-transparent rounded-md shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-frankgreen disabled:opacity-50 mb-4 m-auto"
                            disabled={loading}
                        >
                            Buscar
                        </button>

                        <Link
                            to="/questions/newquestion"
                            className="w-[50%]  px-4 py-2 text-center text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-frankgreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-frankgreen disabled:opacity-50 mb-4 m-auto"
                        >
                            Preguntar
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
};

// Validamos las props.
SearchForm.propTypes = {
    setSearchParams: PropType.func.isRequired,
    loading: PropType.bool.isRequired,
};

export default SearchForm;
