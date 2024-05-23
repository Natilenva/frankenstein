import PropTypes from 'prop-types';
// quiero q el componente sea dinámico, le paso una prop 
export const Button = ({txt}) => {
    return (
        <button className="
            px-1 
            bg-frankgreen
            hover:bg-lime-500 
            rounded-md
            text-white
            font-myFontFamily
            "
        >
            {txt}
        </button>
    )
}

Button.propTypes = {
    txt: PropTypes.string
}