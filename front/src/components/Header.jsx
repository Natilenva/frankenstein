import { Link } from 'react-router-dom';
import { Auth } from './Auth';

// test context:
//import { useContext } from "react"
//import { AuthContext } from "../context/AuthContext"

export const Header = () => {
    //test context:
    /* const { color } = useContext(AuthContext);
   console.log(color); */

    return (
        <header className="bg-white p-8 flex items-center shadow-md">
            <h1 className="font-bold text-white">
                <img src="./../public/frankenstein.png"></img>
                <Link className="" to="/">
                    Frankenstein
                </Link>
            </h1>

            <nav>
                <Auth />
            </nav>
        </header>
    );
};
