
import PropType from 'prop-types';


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
        <form onSubmit={handleSubmit} className='search-form'>
            <div>
                <label htmlFor='question_title'>Titulo:</label>
                <input
                    type='text'
                    id='question_title'
                    value={question_title}
                    onChange={(e) => setQuestion_title(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor='technology'>Tecnologia:</label>
                <input
                    type='text'
                    id='technology'
                    value={technology}
                    onChange={(e) => setTechnology(e.target.value)}
                />
            </div>

            <button disabled={loading}>Buscar</button>
        </form>
    );
};

// Validamos las props.
SearchForm.propTypes = {
    setSearchParams: PropType.func.isRequired,
    loading: PropType.bool.isRequired,
};

export default SearchForm;
