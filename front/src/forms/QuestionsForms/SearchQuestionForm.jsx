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
            <div className="flex flex-col items-center justify-center mx-auto px-4 py-8 max-w-screen-md">
                <div className="text-3xl text-center text-black font-semibold mb-8">
                    Pregunta a Frankenstein
                </div>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-6">
                        <label htmlFor="question_title" className="block mb-1 text-sm font-medium text-black">
                            Título:
                        </label>
                        <input
                            className="w-full px-4 py-2 bg-white rounded-md border border-solid border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            type="text"
                            id="question_title"
                            value={question_title}
                            onChange={(e) => setQuestion_title(e.target.value)}
                            placeholder="Ingrese el título de la pregunta"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="technology" className="block mb-1 text-sm font-medium text-black">
                            Tecnología:
                        </label>
                        <input
                            className="w-full px-4 py-2 bg-white rounded-md border border-solid border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            type="text"
                            id="technology"
                            value={technology}
                            onChange={(e) => setTechnology(e.target.value)}
                            placeholder="Ingrese la tecnología relacionada"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            className="w-[48%] px-4 py-2 text-sm font-medium text-white bg-frankgreen border border-transparent rounded-md shadow-sm hover:bg-[#829821] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-frankgreen disabled:opacity-50"
                            disabled={loading}
                        >
                            Buscar
                        </button>
                        <Link
                            to="/questions/newquestion"
                            className="flex justify-center w-[48%] px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-[#829821] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-frankgreen disabled:opacity-50"
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
