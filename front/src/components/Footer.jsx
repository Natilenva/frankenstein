import { Link } from 'react-router-dom';
import {
    FaHome,
    FaUserAlt,
    FaProjectDiagram,
    FaQuestion,
    FaPlus,
} from 'react-icons/fa';

export const Footer = () => {
    return (
        <footer className="sticky bg-black p-4 botton-0 flex items-center justify-between shadow-md ">
            <Link to="/" className="flex flex-col items-center text-white">
                <FaHome size={20} />
                <span className="text-xs">Inicio</span>
            </Link>
            <Link
                to="/projects"
                className="flex flex-col items-center text-white"
            >
                <FaProjectDiagram size={20} />
                <span className="text-xs">Proyectos</span>
            </Link>
            <Link to="/crear" className="flex flex-col items-center text-white">
                <FaPlus size={20} />
                <span className="text-xs">Crear</span>
            </Link>
            <Link
                to="/questions"
                className="flex flex-col items-center text-white"
            >
                <FaQuestion size={20} />
                <span className="text-xs">Preguntas</span>
            </Link>
            <Link
                to="/profile/:id"
                className="flex flex-col items-center text-white"
            >
                <FaUserAlt size={20} />
                <span className="text-xs">Perfil</span>
            </Link>
        </footer>
    );
};
