export const getAllProjectsService = async () => {
    
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}`);
    
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
}

export const getSingleProjectService = async (id) => {
    
    //const response = await fetch(`${import.meta.env.VITE_BASE_URL}/project/:id`);
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/project/${id}`);
    
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);//! accedemos al objeto json y al campo message ?
    }

    return json.data;
}

// ! Si nuestro Registro devuelve algo tenemos q retornarlo aquí 
export const registerUserService = async ({ email, password }) => {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        /* body: JSON.stringify({ email: email, password: password }), */
        body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    
    if (!response.ok) {
        throw new Error(json.message)
    }
    /* return json.data; */
} 