import React from 'react';
import './Buttons.css';
import PropType from 'prop-types';
const Buttons = ({ text, id, onClick }) => {
    return (
        <div>
            <button className="btn-principal" id={id} onClick={() => onClick()}>
                {text}
            </button>
        </div>
    );
};

Buttons.propTypes = {
    text: PropType.string.isRequired,
    id: PropType.string.isRequired,
    onClick: PropType.func,
};

export default Buttons;
