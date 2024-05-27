import React from 'react';
import './Buttons.css';
const Buttons = ({ text, id, onClick }) => {
    return (
        <div>
            <button className="btn-principal" id={id} onClick={() => onClick()}>
                {text}
            </button>
        </div>
    );
};

export default Buttons;
