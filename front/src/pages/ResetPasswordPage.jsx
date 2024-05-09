import { useContext } from "react";
// import { useParams } from "react-router-dom"

import { AuthContext } from "../context/AuthContext";

import ResetPasswordForm from "../forms/ResetPasswordForm";

export const ResetPasswordPage = ()=>{
    const {authRP}= useContext(AuthContext);

    return(
        <main>
            <h1>Cambio de contraseña </h1>
             <ResetPasswordForm
                authRP={authRP}
             />
    </main>
    );
};

export default ResetPasswordPage;