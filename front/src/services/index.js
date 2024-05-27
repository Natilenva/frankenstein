/* 
getAllProjectsService: 
con lógica de reintento para manejar situaciones en las que la conexión inicial puede fallar, 
mecanismo de reintento simple utilizando un bucle try...catch y 
un temporizador para esperar un período antes de volver a intentarlo
*/
export const getAllProjectsService = async () => {
    const maxRetries = 3; // Número máximo de intentos
    let retries = 0;

    while (retries < maxRetries) {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/allProjects`
            );
            //console.log('response getAllProjectsService: ', response);

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.message);
            }

            return json.data;
        } catch (error) {
            console.error('Error fetching projects:', error);
            retries++;
            console.log(`Retrying... (${retries}/${maxRetries})`);
            // Esperar 1 segundo antes de volver a intentarlo
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }

    throw new Error('Failed to fetch projects after maximum retries.');
};

/* export const getAllProjectsService = async () => {
    const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/allProjects`
    );
    console.log('response getAllProjectsService: ', response);

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
}; */

export const getSingleProjectService = async (id) => {
    const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/project/${id}`
    );

    //console.log('response getSingleProjectService: ', response);

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
};

// ! Si nuestro Registro devuelve algo tenemos q retornarlo aquí
export const registerUserService = async ({ email, register_password }) => {
    //console.log('registerUserService; email, password: ', email, register_password);

    //* Requests a la url del backend (igual q postman) /register
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, register_password }),
    });
    //console.log('response registerUserService: ', response);

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
    console.log(json.token);
    if (json.token) {
        localStorage.setItem('authToken', json.token);
    }
    return json.data;
};

export const loginUserService = async ({ email, register_password }) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, register_password }),
    });
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.data; //devuelve el token
};

// * ----------------------------------------------------------------
export const sendProjectService = async ({ data, token }) => {
    //console.log('hola');
    const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/newproject`,
        {
            method: 'POST',
            body: data, //* form-data
            headers: {
                Authorization: token,
            },
        }
    );
    //console.log(response);

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
    //console.log(response);
    return json.data;
};

// * ------------------------------------------------------------------------------------
export const updateProjectService = async ({ data, token, id }) => {
    //console.log('hola');
    const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/projectupdate/${id}`,
        {
            method: 'PUT',
            body: data, //* form-data
            headers: {
                Authorization: token,
            },
        }
    );
    //console.log(response);

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
    //console.log(response);
    return json.data;
};

export const deleteProjectService = async ({ id, token }) => {
    const response = await fetch(
        `
    
    ${import.meta.env.VITE_BASE_URL}/project/${id}`,
        {
            method: 'DELETE',
            headers: {
                Authorization: token,
            },
        }
    );
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.data;
};

// endpoint /user, Get info user for React Context
export const getMyUserDataService = async ({ token }) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/user`, {
        headers: {
            Authorization: token,
        },
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
};
