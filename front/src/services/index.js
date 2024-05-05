export const getAllProjectsService = async () => {
    
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}`);
    //console.log('response getAllProjectsService: ', response);
    
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
}

export const getSingleProjectService = async (id) => {
    
    //const response = await fetch(`${import.meta.env.VITE_BASE_URL}/project/:id`);
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/project/${id}`);

    console.log('response getSingleProjectService: ', response);
    
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);//? accedemos al objeto json y al campo message ?
    }

    return json.data;
}

// ! Si nuestro Registro devuelve algo tenemos q retornarlo aquí 
export const registerUserService = async ({ email, register_password }) => {
    //console.log('registerUserService; email, password: ', email, register_password);
    
    // TODO REQUESTS:
    //? Requests a la url del backend (igual q postman) /register 

    // TODO Request 1 
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // body: JSON.stringify({ email: email, password: password }), 
        body: JSON.stringify({ email, register_password }),
    });
    //console.log('response registerUserService: ', response);

    // TODO Request 2 
    /* const response = await fetch(
        'http://localhost:3000/register',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify(data) 
            body: JSON.stringify({ email, register_password }),
        }
    ); */

    const json = await response.json();
    
    if (!response.ok) {
        throw new Error(json.message)
    }
    return json.data;
} 

export const loginUserService = async ({ email, register_password }) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, register_password }),
    });
    const json = await response.json();
    
    if (!response.ok) {
        throw new Error(json.message)
    }
    return json.data; //devuelve el token
}
