import { Link } from "react-router-dom"
import { Auth } from "./Auth"

// test context: 
//import { useContext } from "react"
//import { AuthContext } from "../context/AuthContext"

export const Header = () => {
    //test context:  
   /* const { color } = useContext(AuthContext);
   console.log(color); */

    return (
        <header>      
            <h1>
                <Link to="/">Frankenstein</Link>
            </h1>

            <nav>
                <Auth />
            </nav>
        </header>
    );
};